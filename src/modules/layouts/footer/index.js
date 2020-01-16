import React, { Component } from "react";
import "../../../index.css"

export default class Header extends Component {
    render() {
        const {isAuthenticated} = this.props;
        console.log(isAuthenticated)

        return(
            <div>
                <footer className="footer">
                    <span> WAM © 2020, Writter Application Management </span>
                </footer>
            </div>
        )
    }
}