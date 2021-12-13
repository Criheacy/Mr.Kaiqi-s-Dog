import styled from "@emotion/styled";
import * as d3 from "d3";
import moment from "moment";
import { useCallback, useMemo } from "react";
import chroma from "chroma-js";
import {
  SignInDataType,
  UserDataType,
  UserTotalDataType,
} from "../../../@types/data";
import useData from "../../../hooks/useData";
import useD3 from "../../../hooks/useD3";
import { config as signInRateConfig } from "./config";

const Preprocess = (
  signInLog: SignInDataType[],
  user: UserDataType[],
  userTotal: UserTotalDataType[]
) => {
  let { minTime, maxTime } = signInLog.reduce(
    (prev, item) => {
      const itemDate = moment(item.date);
      if (!prev.minTime) prev.minTime = itemDate;
      if (!prev.maxTime) prev.maxTime = itemDate;
      prev.minTime = moment.min(prev.minTime, itemDate);
      prev.maxTime = moment.max(prev.maxTime, itemDate);
      return prev;
    },
    {
      minTime: undefined as moment.Moment | undefined,
      maxTime: undefined as moment.Moment | undefined,
    }
  );

  // Some of the time of sign-in records exceeds 24 o'clock (such as 00:17),
  // so it is counted as the next day. Here to fix it.
  minTime = minTime?.subtract(4, "hours").startOf("day");
  maxTime = maxTime?.subtract(4, "hours").startOf("day");

  // returns 0 if maxTime is undefined
  const totalDays = (maxTime?.diff(minTime, "days") || -1) + 1;
  const signInCount = new Array(totalDays).fill(0) as number[];
  const earlySignInCount = new Array(totalDays).fill(0) as number[];
  const signInPerson = Array.from(Array(totalDays), () => [] as string[]);

  // convert userTotal to array
  const userTotalArray = Array.from(Array(totalDays).keys()).map((index) => {
    const current = moment(minTime)?.add(index, "days");
    return userTotal.find((item) => moment(item.date).isSame(current))
      ?.user_total;
  });

  if (totalDays !== 0) {
    // expensive!
    signInLog.forEach((item) => {
      const daysDiff = moment(item.date)
        // fixed exceeding time
        .subtract(4, "hours")
        .diff(minTime?.startOf("day"), "days");
      if (!signInPerson[daysDiff].includes(item.user_id)) {
        signInPerson[daysDiff].push(item.user_id);
        signInCount[daysDiff] += 1;

        if (moment(item.date).isBefore(moment(item.date).hour(22).minute(50)))
          earlySignInCount[daysDiff] += 1;
      }
    });
  }

  const [signInData, earlySignInData] = [signInCount, earlySignInCount].map(
    (list) =>
      list.map((count, index) => {
        const date = moment(minTime).add(index, "days");
        const weekOfYear = date?.week();
        const dayOfWeek = date?.day();
        return {
          date,
          weekOfYear,
          dayOfWeek,
          unSignIn: userTotalArray[index]
            ? (userTotalArray[index] || 0) - count
            : undefined,
        };
      })
  );

  return {
    signInData,
    earlySignInData,
  };
};

const SignInRate = () => {
  const { signInLog, user, userTotal } = useData();
  const { signInData } = useMemo(
    () => Preprocess(signInLog, user, userTotal),
    [signInLog, user, userTotal]
  );

  const colorMap = useCallback((unSignInCount?: number | undefined | null) => {
    const fulfilledColor = "#00d924";
    const scale = chroma.scale(["#ffc800", "#ff3300"]).domain([0, 0.8, 1]);
    if (unSignInCount === undefined || unSignInCount === null)
      return "transparent";
    if (unSignInCount === 0) return fulfilledColor;

    // map [1 ~ Infinity] to [0 ~ 1]
    const k = 0.5; // scale constant
    const scaledCount = 1 - 1 / Math.exp((unSignInCount - 1) * k);
    return scale(scaledCount).hex();
  }, []);

  const renderer = useCallback(
    (svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>) => {
      const dataGroup = svg
        .append("g")
        .attr("class", "canvas-area")
        .selectAll("g")
        .data(signInData)
        .enter()
        .append("g")
        .attr("class", "data-group");

      dataGroup
        .append("rect")
        .attr(
          "x",
          (item) =>
            item.weekOfYear *
            (signInRateConfig.blockSize + signInRateConfig.blockGap)
        )
        .attr(
          "y",
          (item) =>
            item.dayOfWeek *
            (signInRateConfig.blockSize + signInRateConfig.blockGap)
        )
        .attr("width", signInRateConfig.blockSize)
        .attr("height", signInRateConfig.blockSize)
        .attr("rx", signInRateConfig.blockCornerRadius)
        .attr("ry", signInRateConfig.blockCornerRadius)
        .attr("fill", (item) => colorMap(item.unSignIn));

      dataGroup
        // create text element only for items with unSignIn > 0
        .filter((item) => !!item.unSignIn)
        .append("text")
        .attr(
          "x",
          (item) =>
            item.weekOfYear *
              (signInRateConfig.blockSize + signInRateConfig.blockGap) +
            signInRateConfig.blockSize * 0.5
        )
        .attr(
          "y",
          (item) =>
            item.dayOfWeek *
              (signInRateConfig.blockSize + signInRateConfig.blockGap) +
            signInRateConfig.blockSize * 0.5 +
            signInRateConfig.fontSize * 0.4
        )
        .style("font-size", signInRateConfig.fontSize)
        .style("text-anchor", "middle")
        .text((item) => item.unSignIn || "");

      svg
        .append("g")
        .attr("class", "x-axis")
        .selectAll("text")
        .data(["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"])
        .enter()
        .append("text")
        .attr(
          "x",
          ((signInData.length !== 0 ? signInData[0].weekOfYear : 0) - 0.5) *
            (signInRateConfig.blockSize + signInRateConfig.blockGap)
        )
        .attr(
          "y",
          (_, index) =>
            index * (signInRateConfig.blockSize + signInRateConfig.blockGap) +
            signInRateConfig.blockSize * 0.5 +
            signInRateConfig.subFontSize * 0.4
        )
        .style("fill", "#606060")
        .style("font-size", signInRateConfig.subFontSize)
        .style("text-anchor", "end")
        .text((item) => item);

      svg
        .append("g")
        .attr("class", "y-axis")
        .selectAll("text")
        .data(signInData)
        .enter()
        .filter(
          (data, index) =>
            data.dayOfWeek === 0 &&
            (moment(data.date).subtract(1, "week").month() !== data.date.month() || index < 7)
        )
        .append("text")
        .attr(
          "x",
          (item) =>
            item.weekOfYear *
              (signInRateConfig.blockSize + signInRateConfig.blockGap) +
            signInRateConfig.blockSize * 0.5
        )
        .attr(
          "y",
          (item) =>
            (item.dayOfWeek - 1) *
              (signInRateConfig.blockSize + signInRateConfig.blockGap) +
            signInRateConfig.blockSize * 0.5 +
            signInRateConfig.fontSize * 0.4
        )
        .style("fill", "#606060")
        .style("font-size", signInRateConfig.subFontSize)
        .style("text-anchor", "middle")
        .text((item) => item.date.format("MMM").toUpperCase());
    },
    [colorMap, signInData]
  );

  const svgRef = useD3(renderer, true);

  return (
    <Container>
      <svg ref={svgRef} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SignInRate;
