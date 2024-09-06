"use client"
import FixRateComponent from "./FixRateComponent"
import CompoundRateComponent from "./CompoundRateComponent"

export default function Calculators() {
    return (
        <div className="w-full">
            <FixRateComponent />
            <CompoundRateComponent />
        </div>
    )
}
