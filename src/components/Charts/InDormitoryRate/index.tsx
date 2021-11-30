import useData from "../../../hooks/useData";
import { SignInDataType, UserDataType } from "../../../@types/data";
import { useCallback, useMemo } from "react";
import useD3 from "../../../hooks/useD3";
import * as d3 from "d3";
import styled from "@emotion/styled";
import { config } from "./config";
import chroma from "chroma-js";

const Preprocess = (signInLog: SignInDataType[], user: UserDataType[]) => {
  const userTable = user.map((item) => ({
    user_id: item.user_id,
    user_name: item.user_name,
    diffFromPrev: 0,
    inDormitory: 0,
    totalRecords: 0,
  }));

  signInLog.forEach((item, index, array) => {
    const currentUser = userTable.find(
      (userItem) => userItem.user_id === item.user_id
    );
    if (!currentUser) return;
    currentUser.totalRecords++;
    if (index !== 0 && item.origin_message !== array[index - 1].origin_message)
      currentUser.diffFromPrev++;
    if (item.origin_message === "在宿舍") currentUser.inDormitory++;
  });

  return userTable.map((item) => ({
    ...item,
    inDormitory: item.inDormitory / item.totalRecords,
    diffFromPrev: item.diffFromPrev / item.totalRecords,
  }));
};

const InDormitoryRate = () => {
  const { signInLog, user } = useData();
  const inDormitoryRate = useMemo(
    () => Preprocess(signInLog, user),
    [signInLog, user]
  );

  const colorMap = useCallback((x: number, y: number) => {
    return chroma
      .scale(["#ffaa00", "#ceec00", "#00c984"])
      .domain([0.1, 0.6])(x)
      .darken(y)
      .hex();
  }, []);

  const renderer = useCallback(
    (svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const tooltip = d3
        .select("#tooltip")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip");

      svg
        .append("text")
        .attr("x", -config.gridLineFontSize * 2.6)
        .attr("y", (config.gridLineYMax / 2) * config.yScale)
        .attr(
          "transform",
          `rotate(-90 ${-config.gridLineFontSize * 2.6} ${
            (config.gridLineYMax / 2) * config.yScale
          })`
        )
        .style("font-size", config.gridLineFontSize)
        .style("fill", "#808080")
        .style("text-anchor", "middle")
        .text("DIFF. FROM PREV.");

      svg
        .append("text")
        .attr("x", (config.gridLineXMax / 2) * config.xScale)
        .attr("y", config.gridLineFontSize * 2.6)
        .style("font-size", config.gridLineFontSize)
        .style("fill", "#808080")
        .style("text-anchor", "middle")
        .text("IN DORMITORY");

      const xGridLines = Array.from(
        Array(
          Math.round(config.gridLineXMax / config.gridLineXScale) + 1
        ).keys()
      ).map((item) => +(item * config.gridLineXScale).toPrecision(12));

      const yGridLines = Array.from(
        Array(
          Math.round(config.gridLineYMax / config.gridLineYScale) + 1
        ).keys()
      ).map((item) => +(item * config.gridLineYScale).toPrecision(12));

      const xGridLineGroup = svg
        .append("g")
        .attr("class", "x-grid-line-container")
        .selectAll("line")
        .data(xGridLines)
        .enter()
        .append("g")
        .attr("class", "x-grid-line");

      xGridLineGroup
        .append("line")
        .attr("x1", (item) => item * config.xScale)
        .attr("x2", (item) => item * config.xScale)
        .attr("y1", 0)
        .attr("y2", config.yScale * config.gridLineYMax)
        .style("stroke-width", 1)
        .style("stroke", "#E0E0E0");

      xGridLineGroup
        .append("text")
        .attr("x", (item) => item * config.xScale)
        .attr("y", config.gridLineFontSize * 1.2)
        .style("font-size", config.gridLineFontSize)
        .style("text-anchor", "middle")
        .style("fill", "#808080")
        .text((item) => item);

      const yGridLineGroup = svg
        .append("g")
        .attr("class", "y-grid-line-container")
        .selectAll("line")
        .data(yGridLines)
        .enter()
        .append("g")
        .attr("class", "y-grid-line");

      yGridLineGroup
        .append("line")
        .attr("x1", 0)
        .attr("x2", config.xScale * config.gridLineXMax)
        .attr("y1", (item) => item * config.yScale)
        .attr("y2", (item) => item * config.yScale)
        .style("stroke-width", 1)
        .style("stroke", "#E0E0E0");

      yGridLineGroup
        .append("text")
        .attr("x", -config.gridLineFontSize * 0.4)
        .attr(
          "y",
          (item) => item * config.yScale + config.gridLineFontSize * 0.4
        )
        .style("font-size", config.gridLineFontSize)
        .style("text-anchor", "end")
        .style("fill", "#808080")
        .text((item) => item);

      const dataGroup = svg
        .append("g")
        .attr("class", "canvas-area")
        .selectAll("g")
        .data(inDormitoryRate)
        .enter()
        .append("g")
        .attr("class", "data-group");

      dataGroup
        .append("circle")
        .attr("cx", (item) => item.inDormitory * config.xScale)
        .attr("cy", (item) => item.diffFromPrev * config.yScale)
        .attr("r", 4)
        .style("fill", (item) => colorMap(item.inDormitory, item.diffFromPrev));
    },
    [colorMap, inDormitoryRate]
  );

  const svgRef = useD3(renderer, true);

  return (
    <>
      <Container>
        <svg ref={svgRef} />
      </Container>
      <Tooltip id={"tooltip"} />
    </>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Tooltip = styled.div`
  position: absolute;
`;

export default InDormitoryRate;
