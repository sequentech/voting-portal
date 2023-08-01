// SPDX-FileCopyrightText: 2022 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import {TranslationType} from "./en"

const spanishTranslation: TranslationType = {
    translations: {
        breadcrumbSteps: {
            ballot: "Ballot",
            review: "Review",
            confirmation: "Confirmation",
        },
        votingScreen: {
            backButton: "Back",
            reviewButton: "Next",
        },
        startScreen: {
            startButton: "Start Voting",
            instructionsTitle: "Instructions",
            instructionsDescription: "You need to follow these steps to cast your ballot:",
            step1Title: "1. Select your options",
            step1Description: "Answer to the election questions one by one as they are shown. This way you will configure your preferences in your ballot.",
            step2Title: "2. Review your ballot",
            step2Description: "Once you have chosen your preferences, we will proceed to encrypt them and you'll be shown the ballot's tracker id. You'll also be shown a summary with the content of your ballot for review.",
            step3Title: "3. Cast your ballot",
            step3Description: "You can cast it so that it's properly registered. Alternatively, you can audit that your ballot was correctly encrypted.",
        },
    },
}

export default spanishTranslation
