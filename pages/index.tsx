
import React, { useEffect } from "react";
import Head from "next/head";
import Card from "../components/Dashborad/Card";
import Charts from "../components/Dashborad/Chart";
function Home() {

    return (
        <>
           <Card/>
           <Charts/>
        </>
    );
}
export default Home;
