
import { P5CanvasInstance, ReactP5Wrapper, SketchProps } from '@p5-wrapper/react'
import {FRACTALS_FRAGMENT_SHADER, FRACTALS_VERTEX_SHADER} from "./shaders/Fractals.ts";

type FractalSketchProps = SketchProps & {
    width: number,
    height: number,
}

function sketch(p5: P5CanvasInstance<FractalSketchProps>) {
    p5.w = p5.width
    p5.h = p5.height

    p5.startTime = Date.now()

    let fractalShader;

    const resetCanvas = (p) => {

    }

    p5.updateWithProps = (props) => {
        p5.w = props.width
        p5.h = props.height
        p5.resizeCanvas(p5.w, p5.h);
    }

    p5.setup = () => {
        p5.createCanvas(p5.w, p5.h, p5.WEBGL)
        fractalShader = p5.createShader(FRACTALS_VERTEX_SHADER, FRACTALS_FRAGMENT_SHADER)
        p5.print(fractalShader._vertSrc)
        p5.print(fractalShader._fragSrc)
    }

    p5.draw = () => {
        p5.background(0);
        p5.shader(fractalShader);
        fractalShader.setUniform('iTime', (Date.now() - p5.startTime) / 1000.0)
        p5.rectMode(p5.CENTER)
        p5.plane(p5.width, p5.height);
    }
}

const FractalSketch = ({
    width, height
}: { width: number, height: number }) => <ReactP5Wrapper sketch={sketch} width={width} height={height} />

export default FractalSketch;