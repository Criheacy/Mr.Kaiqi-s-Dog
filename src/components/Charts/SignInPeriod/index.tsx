import useData from "../../../hooks/useData";
import { useCallback, useMemo } from "react";
import * as d3 from "d3";
import moment from "moment";
import useD3 from "../../../hooks/useD3";
import styled from "@emotion/styled";
import { config } from "./config";
import { SignInDataType } from "../../../@types/data";

const Preprocess = (signInLog: SignInDataType[]) => {
  const periodListLength = Math.floor(
    config.endTime.diff(config.startTime) / config.step.asMilliseconds()
  );
  const signInPeriodCount = new Array(periodListLength).fill(0) as number[];
  let beforeCount = 0;
  let afterCount = 0;

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

    if (periodIndex < 0) {
      beforeCount++;
    } else if (periodIndex < periodListLength) {
      signInPeriodCount[periodIndex]++;
    } else {
      afterCount++;
    }
  });

  return [beforeCount, ...signInPeriodCount, afterCount].map(
    (item, index, array) => ({
      index: index === 0 ? -2 : index === array.length - 1 ? index : index - 1,
      count: item,
    })
  );
};

const SignInPeriod = () => {
  const { signInLog } = useData();
  const periodList = useMemo(() => Preprocess(signInLog), [signInLog]);

  const colorMap = useCallback((timeIndex?: number | undefined | null) => {
    const beforeColor = "#00d994";
    const onTimeColor = "#00d924";
    const laterColor = "#9fd900";
    const afterColor = "#ffb700";

    if (timeIndex === undefined || timeIndex === null) return "transparent";
    if (timeIndex < 0) return beforeColor;
    if (timeIndex < 25) return onTimeColor;
    if (timeIndex < 40) return laterColor;
    return afterColor;
  }, []);

  const renderer = useCallback(
    (svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>) => {
      const maxCount = Math.min(
        periodList.reduce((prev, item) => Math.max(prev, item.count), 0),
        config.overHeight
      );
      const [minIndex, maxIndex] = periodList.reduce(
        ([min, max], item) => [
          Math.min(min, item.index),
          Math.max(max, item.index),
        ],
        [0, 0] as [number, number]
      );
      const gridLines = Array.from(
        Array(
          Math.floor(Math.max(maxCount - 1, 0) / config.gridLineScale)
        ).keys()
      ).map((item) => (item + 1) * config.gridLineScale);

      const gridLineGroup = svg
        .append("g")
        .attr("class", "grid-line-container")
        .selectAll("g")
        .data(gridLines)
        .enter()
        .append("g")
        .attr("class", "grid-line");

      gridLineGroup
        .append("line")
        .attr("x1", (minIndex - 1) * (config.barSize + config.barGap))
        .attr("x2", (maxIndex + 1) * (config.barSize + config.barGap))
        .attr("y1", (item) => -item * config.yScale)
        .attr("y2", (item) => -item * config.yScale)
        .style("stroke-width", 1)
        .style("stroke", "#E0E0E0");

      gridLineGroup
        .append("text")
        .attr("x", maxIndex * (config.barSize + config.barGap))
        .attr(
          "y",
          (item) => -item * config.yScale - config.gridLineFontSize * 0.3
        )
        .style("font-size", config.gridLineFontSize)
        .style("text-anchor", "end")
        .style("fill", "#A0A0A0")
        .text((item) => item);

      const dataGroup = svg
        .append("g")
        .attr("class", "canvas-area")
        .selectAll("g")
        .data(periodList)
        .enter()
        .append("g")
        .attr("class", "data-group");

      dataGroup
        .append("rect")
        .attr("x", (item) => item.index * (config.barSize + config.barGap))
        .attr(
          "y",
          (item) =>
            -(item.count > config.overHeight
              ? config.overHeight * config.yScale
              : item.count * config.yScale)
        )
        .attr("width", config.barSize)
        .attr("height", (item) =>
          item.count > config.overHeight
            ? config.overHeight * config.yScale
            : item.count * config.yScale
        )
        .style("fill", (item) => colorMap(item.index));

      dataGroup
        .filter((item) => {
          if (item.index === minIndex || item.index === maxIndex) return true;
          return item.index % 5 === 0;
        })
        .append("text")
        .attr(
          "x",
          (item) =>
            item.index * (config.barSize + config.barGap) + config.barSize / 2
        )
        .attr("y", config.fontSize * 1.2)
        .style("font-size", config.fontSize)
        .style("fill", "#606060")
        .style("text-anchor", "middle")
        .text((item) =>
          item.index === minIndex
            ? "PRE"
            : item.index === maxIndex
            ? "AFT"
            : config.startTime
                .clone()
                .add(item.index * config.step.asMilliseconds(), "milliseconds")
                .format("HH:mm")
        );

      const overHeightDataGroup = dataGroup.filter(
        (item) => item.count > config.overHeight
      );

      [10, 17, 24].forEach((offset) =>
        overHeightDataGroup
          .append("line")
          .attr(
            "x1",
            (item) =>
              item.index * (config.barSize + config.barGap) - config.barGap / 2
          )
          .attr(
            "x2",
            (item) =>
              item.index * (config.barSize + config.barGap) +
              config.barSize +
              config.barGap / 2
          )
          .attr(
            "y1",
            -config.overHeight * config.yScale + offset + config.barSize * 0.5
          )
          .attr("y2", -config.overHeight * config.yScale + offset)
          .style("stroke-width", 3)
          .style("stroke", "white")
      );

      overHeightDataGroup
        .append("text")
        .attr(
          "x",
          (item) =>
            item.index * (config.barSize + config.barGap) + config.barSize / 2
        )
        .attr(
          "y",
          -config.overHeight * config.yScale +
            config.barSize * 0.5 -
            config.fontSize * 0.8
        )
        .style("font-size", config.fontSize)
        .style("fill", "#606060")
        .style("text-anchor", "middle")
        .text((item) => item.count);
    },
    [colorMap, periodList]
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

export default SignInPeriod;
