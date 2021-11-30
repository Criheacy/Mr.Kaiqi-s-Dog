import useData from "../../../hooks/useData";
import { useCallback, useMemo } from "react";
import * as d3 from "d3";
import moment from "moment";
import useD3 from "../../../hooks/useD3";
import styled from "@emotion/styled";
import { config } from "./config";
import { SignInDataType, UserDataType } from "../../../@types/data";
import chroma from "chroma-js";

const Preprocess = (signInLog: SignInDataType[], user: UserDataType[]) => {
  // get period segment length
  const periodListLength = Math.floor(
    config.endTime.diff(config.startTime) / config.step.asMilliseconds()
  );
  const userSignInTime = user.map((item) => ({
    user_id: item.user_id,
    user_name: item.user_name,
    signInTable: new Array(periodListLength).fill(0) as number[],
  }));

  signInLog.forEach((item) => {
    const itemDate = moment(item.date);
    const periodIndex = Math.floor(
      itemDate.diff(
        config.startTime
          .clone()
          .year(itemDate.year())
          .month(itemDate.month())
          .date(itemDate.date())
      ) / config.step.asMilliseconds()
    );
    if (periodIndex >= 0 && periodIndex < periodListLength) {
      const tableItem = userSignInTime.find(
        (tableItem) => tableItem.user_id === item.user_id
      );
      if (tableItem) tableItem.signInTable[periodIndex]++;
    }
  });

  return userSignInTime.map((item) => {
    const signInCount = item.signInTable.reduce((prev, item) => prev + item, 0);
    const signInTimeAverage = item.signInTable.reduce(
      (prev, item, index) => prev + item * index,
      0
    ) / signInCount;

    return {
      ...item,
      signInCount,
      signInTimeAverage
    };
  }).sort((first, second) => first.signInTimeAverage - second.signInTimeAverage);
};

const AllUserSignInTime = () => {
  const { signInLog, user } = useData();
  const userSignInTime = useMemo(() => Preprocess(signInLog, user), [signInLog, user]);

  const colorMap = useCallback((signInCount?: number | undefined | null) => {
    const scale = chroma.scale(["#b8ffc3", "#00d924", "#008d2e"]).domain([0, 1]);
    if (signInCount === undefined || signInCount === null || signInCount === 0)
      return "transparent";

    // map [1 ~ Infinity] to [0 ~ 1]
    const k = 0.1; // scale constant
    const scaledCount = 1 - 1 / Math.exp((signInCount - 1) * k);
    return scale(scaledCount).hex();
  }, []);

  const renderer = useCallback(
    (svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>) => {
      const userDataGroup = svg
        .append("g")
        .attr("class", "canvas-area")
        .selectAll("g")
        .data(userSignInTime)
        .enter()
        .append("g")
        .attr("class", "user-data-group")
        .attr("transform", (item, index) => `translate(0, ${index * (config.blockSize + config.blockGap)})`);

      userDataGroup
        .selectAll("rect")
        .data(item => item.signInTable)
        .enter()
        .append("rect")
        .attr("x", (item, index) => index * (config.blockSize + config.blockGap))
        .attr("y", 0)
        .attr("width", config.blockSize)
        .attr("height", config.blockSize)
        .attr("rx", config.blockCornerRadius)
        .style("fill", item => colorMap(item));

      userDataGroup.append("text")
        .attr("x", -2.6 * (config.blockSize + config.blockGap))
        .attr("y", config.fontSize * 0.8)
        .style("font-size", config.fontSize)
        .style("fill", "#606060")
        .text(item => item.user_name);
    },
    [colorMap, userSignInTime]
  );

  const svgRef = useD3(renderer);

  return (
    <Container>
      <svg ref={svgRef} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 90%;
  margin: 1rem;
  
  overflow: auto;
`;

export default AllUserSignInTime;
