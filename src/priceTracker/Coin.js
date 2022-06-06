import React, { useState, useEffect } from "react";
import { Col, Container, Row, Table } from "reactstrap";
import axios from "axios";


const Coin = () => {

    const [coins, setCoins] = useState([]);

    useEffect(() => {
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
            .then(res => {
                setCoins(res.data);
                console.log(res.data);
            })
            .catch(error => console.error("Error"));
    }, []);


    return (
         
        <div className="Coin">
            <h1 className="title">This site created by Javokhir</h1> 
            <Container>
                <Row>
                    <Col md="12">
                        <Table className="mt-5" dark>
                            <thead>
                                <tr>
                                    <th>
                                        Crypto Name
                                    </th>
                                    <th>
                                        Current price
                                    </th>
                                    <th>
                                        Market cap change
                                    </th>
                                    <th>
                                        Market cap rank
                                    </th>
                                </tr>
                            </thead>
                            {coins.map(coin => {
                                return (
                                    <tbody key={coin.id}>
                                        <tr>
                                            <td>
                                                <img className="cryptoImage" src={coin.image} alt="crypto image" />
                                                {coin.name}
                                            </td>
                                            <td>{coin.current_price}</td>
                                            {coin.price_change_percentage_24h < 0 ? (
                                                <td className="red">
                                                    {coin.price_change_percentage_24h.toFixed(2)}%
                                                </td>) : (
                                                <td className="green">
                                                    {coin.price_change_percentage_24h.toFixed(2)}%
                                                </td>
                                            )
                                            }
                                            <td>{coin.market_cap_rank}</td>
                                        </tr>
                                    </tbody>
                                );
                            })}
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Coin;