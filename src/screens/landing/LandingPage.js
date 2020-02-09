import React from "react";
import Button from "../../components/button";

const LandingPage = ({play}) => (
    <div>
        <h1>Typo</h1>
        <Button onClick={play}/>
    </div>
)

export default LandingPage