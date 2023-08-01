// SPDX-FileCopyrightText: 2022 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import React, {useState} from "react"
import {Routes, Route} from "react-router-dom"
import {styled} from "@mui/material/styles"
import {Footer, Header, PageBanner} from "ui-essentials"
import Stack from "@mui/material/Stack"
import {StartScreen} from "./screens/StartScreen"
import {VotingScreen} from "./screens/VotingScreen"
import {ReviewScreen} from "./screens/ReviewScreen"

const StyledApp = styled(Stack)`
    min-height: 100vh;
`

const App = () => {
    return (
        <StyledApp>
            <Header />
            <PageBanner marginBottom="auto">
                <Routes>
                    <Route path="/" element={<StartScreen />} />
                    <Route path="/vote" element={<VotingScreen />} />
                    <Route path="/review" element={<ReviewScreen />} />
                </Routes>
            </PageBanner>
            <Footer />
        </StyledApp>
    )
}

export default App
