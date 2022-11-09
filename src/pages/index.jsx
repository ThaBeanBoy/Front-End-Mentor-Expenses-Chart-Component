import React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import "../styles.scss"
import data from "../data.json"

const maxAmountSpent = Math.max(...data.map(({ amount }) => amount))

function Graph({ day, amount, index, setIndexToShow, show }) {
  const [bln_progressBarHovered, setBln_progressBarHovered] = useState(false)
  const showingValue = show || bln_progressBarHovered
  const className = `progress ${amount === maxAmountSpent ? "max" : ""} ${
    showingValue ? "showing-vaue" : ""
  }`

  return (
    <div className="dayStat">
      <div className="wrapper">
        <motion.div
          animate={{ height: `${(amount / maxAmountSpent) * 100}%` }}
          className={className}
          onClick={() => setIndexToShow(index)}
          onMouseEnter={() => {
            setBln_progressBarHovered(true)
            console.log(bln_progressBarHovered)
          }}
          onMouseLeave={() => setBln_progressBarHovered(false)}
        />
        {show || bln_progressBarHovered ? (
          <div className="value">${amount}</div>
        ) : (
          <></>
        )}
      </div>

      <p className="day">{day}</p>
    </div>
  )
}

export default function Home() {
  const [indexToShow, setIndexToShow] = useState(null) //Initial state should be a null

  return (
    <div className="App">
      <div className="stats">
        <header>
          <div className="user-details">
            <p>My Balance</p>
            <h2>$921.48$</h2>
          </div>

          <img src="./logo.svg" alt="logo icon" />
        </header>

        <main>
          <h2>Spending - Last 7 days</h2>

          <div className="graphs">
            {data.map(({ day, amount }, index) => (
              <Graph
                day={day}
                amount={amount}
                index={index}
                setIndexToShow={setIndexToShow}
                show={index === indexToShow}
              />
            ))}
          </div>

          <hr />
          <div className="bottom-details">
            <div className="left">
              <p>Total this month</p>
              <h1>$478.33</h1>
            </div>

            <div className="right">
              <p className="percantage-movement">+2.4%</p> <br />{" "}
              <p>from last month</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
