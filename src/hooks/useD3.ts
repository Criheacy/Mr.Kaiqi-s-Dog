import { useEffect, useRef } from "react";
import * as d3 from "d3";

export type d3SVG = d3.Selection<SVGSVGElement | null, unknown, null, undefined>;

const useD3 = (
  render: (
    svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>
  ) => void,
  dep: unknown[],
  autosize: boolean = false
) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    while (svgRef.current?.lastChild) {
      svgRef.current?.removeChild(svgRef.current?.lastChild);
    }
    render(d3.select(svgRef.current));

    if (autosize) {
      const bbox = svgRef.current?.getBBox();
      svgRef.current?.setAttribute("width", `${bbox?.width}px`);
      svgRef.current?.setAttribute("height", `${bbox?.height}px`);
      svgRef.current?.setAttribute(
        "viewBox",
        `${bbox?.x} ${bbox?.y} ${bbox?.width} ${bbox?.height}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render, ...dep]);

  return svgRef;
};

export default useD3;