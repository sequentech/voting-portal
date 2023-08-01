// SPDX-FileCopyrightText: 2022 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
const englishTranslation = {
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
            step1Description:
                "Answer to the election questions one by one as they are shown. This way you will configure your preferences in your ballot.",
            step2Title: "2. Review your ballot",
            step2Description:
                "Once you have chosen your preferences, we will proceed to encrypt them and you'll be shown the ballot's tracker id. You'll also be shown a summary with the content of your ballot for review.",
            step3Title: "3. Cast your ballot",
            step3Description:
                "You can cast it so that it's properly registered. Alternatively, you can audit that your ballot was correctly encrypted.",
        },
        reviewScreen: {
            title: "Review your ballot",
            description:
                "To make changes in your selections, click “<b>Change selection</b>” button, to confirm your selections, click “<b>Submit Ballot</b>” button bellow, and to audit your ballot click the “<b>Audit the Ballot</b>” button bellow. Please note than once you submit your ballot, you have voted and you will not be issued another ballot for this election.",
            backButton: "Edit ballot",
            castBallotButton: "Cast your ballot",
            auditButton: "Audit ballot",
            ballotIdHelpDialog: {
                title: "Vote has not been cast",
                content: "<p>This is your Ballot Tracker ID, but <b>your vote has not been cast yet</b>. If you try to track the ballot, you will not find it.</p><p>The reason we show the Ballot Tracker ID at this stage is to allow you to audit the correctness of the encrypted ballot before casting it.</p>",
                ok: "I accept my vote has NOT been cast",
                cancel: "Cancel",
            },
        },
        confirmationScreen: {
            title: "Your vote has been cast",
            description:
                "The confirmation code bellow verifies that <b>your ballot has been cast successfully</b>. You can use this code to verify that your ballot has been counted.",
            ballotId: "Ballot ID",
            printButton: "Print",
            finishButton: "Finish",
            verifyCastTitle: "Verify that your ballot has been cast",
            verifyCastDescription: "You can verify your ballot has been cast correctly at any moment using the following QR code:",
        },
    },
}

export type TranslationType = typeof englishTranslation

export default englishTranslation
