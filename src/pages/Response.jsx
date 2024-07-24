import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import styles from '../assets/Response.module.css'

function Response() {
    const [noResponse, setNoResponse] = useState(false);

    return (
        <div className={styles.response}>
            <Navbar />
            {noResponse && <p className={styles.noResponse}>No response yet collected</p>}
            <section className={styles.content}>
                <div className={styles.brief}>
                    <div className={styles.card}>
                        <p>Views</p>
                        <p>6</p>
                    </div>
                    <div className={styles.card}>
                        <p>Starts</p>
                        <p>3</p>
                    </div>
                    <div className={styles.card}>
                        <p>Completion rate</p>
                        <p>33%</p>
                    </div>
                </div>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th></th>
                                <th>First interaction time</th>
                                <th>Button 1</th>
                                <th>Email 1</th>
                                <th>Text 1</th>
                                <th>Button 2</th>
                                <th>Rating 1</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>July 17, 03:23 PM</td>
                                <td>Hi!</td>
                                <td>abc@g.com</td>
                                <td>alpha</td>
                                <td>Studio App to Manage Clients</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>July 17, 03:23 PM</td>
                                <td>Hi!</td>
                                <td>abc@g.com</td>
                                <td>fsdfasd</td>
                                <td></td>
                                <td>3</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>July 17, 03:23 PM</td>
                                <td>Hi!</td>
                                <td>abc@g.com</td>
                                <td></td>
                                <td></td>
                                <td>4</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}

export default Response