import React from "react";

import { marketChart } from "../../services/cryptoApi";

//Images
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";

//loading
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader"; 

//CSS
import styles from "./TableCoin.module.css"

function TableCoin({coins,isLoading, setChart}) {
    return (
        <div className={styles.container}>
            {isLoading ? (<ClimbingBoxLoader color="#083dfa" style={{width:20}} />) : (
                <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Coins</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>24H</th>
                        <th>Total Volume</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {coins.map(coin => 
                        <TableRow coin={coin} key={coin.id} setChart={setChart} />
                    )}
                </tbody>
                </table>
            )}
        </div>
    )
}

export default TableCoin

const TableRow = ({coin, setChart,}) => {

    const {
        id,name,image,symbol,current_price,total_volume,price_change_percentage_24h: price_change,
    } = coin; 

    const showHandler = async () => {
        try {
            const res = await fetch (marketChart(id));
            const json = await res.json();
            setChart({...json, coin});
        } catch (error) {
            setChart(null)
        }
    };

    return(
        <tr>
            <td>
                <div className={styles.symbol} onClick={showHandler}>
                    <img src={image} alt="" />
                    <span>{symbol.toUpperCase()}</span>
                </div>
            </td>
            <td>{name}</td>
            <td>${current_price.toLocaleString()}</td>
            <td className={price_change > 0 ? styles.success : styles.error}>{price_change.toFixed(2)}%</td>
            <td>{total_volume.toLocaleString()}</td>
            <td> <img src={price_change > 0 ? chartUp : chartDown} alt={name} /> </td>
        </tr>
    )
}