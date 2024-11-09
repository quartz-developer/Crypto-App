import React, { useEffect, useState } from "react";

import { getCoinList } from "../../services/cryptoApi";
import TableCoin from "../modules/Tablecoin";
import Pagination from "../modules/Pagination";
import Chart from "../modules/Chart";
import Search from "../modules/Search";

function HomePage() {

    const [coins, setCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1); 
    const [currency, setCurrency] = useState ("usd");
    const [chart, setChart] = useState (null)

    useEffect(() => {
        setIsLoading (true); 
        const getData = async () => {
            try {
                const res = await fetch(getCoinList(page, currency));
                const json = await res.json();
                setCoins(json);
                setIsLoading(false);

            } catch (error) {
                console.log (error)
            }
        }
        getData();
    },[page, currency])


    return (
        <>
            <Search currency={currency} setCurrency={setCurrency} />
            <TableCoin coins={coins} isLoading={isLoading} setChart={setChart} />
            <Pagination page ={page} setPage={setPage} />
            {!!chart && <Chart chart={chart} setChart={setChart} /> }
        </>
    )
}

export default HomePage