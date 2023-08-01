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
            startButton: "Empezar a votar",
            instructionsTitle: "Instrucciones",
            instructionsDescription: "Seguirá estos pasos al emitir tu voto:",
            step1Title: "1. Seleccione su opción de voto",
            step1Description:
                "Seleccione sus opciones de voto que se presentan una a una. Configurará así las preferencias de su papeleta.",
            step2Title: "2. Revise su papeleta",
            step2Description:
                "Una vez ha elegido sus preferencias, procederemos a cifrarlas y obtendrá un localizador. Le mostraremos el contenido de su papeleta para que pueda revisarla.",
            step3Title: "3. Envíe su voto",
            step3Description:
                "Puede enviar su voto a la urna electrónica para que sea debidamente registrado.",
        },
        reviewScreen: {
            title: "Review your ballot",
            description:
                "To make changes in your selections, click “<b>Change selection</b>” button, to confirm your selections, click “<b>Submit Ballot</b>” button bellow, and to audit your ballot click the “<b>Audit the Ballot</b>” button bellow. Please note than once you submit your ballot, you have voted and you will not be issued another ballot for this election.",
            backButton: "Edit ballot",
            castBallotButton: "Cast your ballot",
            auditButton: "Audit ballot",
            ballotIdHelpDialog: {
                title: "Voto no emitido",
                content:
                    "<p>Está a punto de copiar el Localizador del Voto, pero <b>su voto aún no se ha emitido</b>. Si intenta buscar el Localizador del Voto, no lo encontrará.</p><p>La razón por la que mostramos el Localizador del Voto en este momento es para que pueda auditar la corrección del voto cifrado antes de emitirlo. Si esa es la razón por la que desea copiar el Localizador del Voto, proceda a copiarlo y luego audite su voto.</p>",
                ok: "Acepto que mi voto NO ha sido emitido",
                cancel: "Cancelq4",
            },
        },
        confirmationScreen: {
            title: "Su voto ha sido emitido",
            description:
                "El código de confirmación que aparece a continuación verifica que <b>su voto se ha emitido correctamente</b>. Puede utilizar este código para verificar que su voto ha sido contabilizado.",
            ballotId: "Localizador del Voto",
            printButton: "Imprimir",
            finishButton: "Finalizar",
            verifyCastTitle: "Compruebe que su voto ha sido emitido",
            verifyCastDescription:
                "Puede comprobar en todo momento que su papeleta se ha emitido correctamente utilizando el siguiente código QR:",
            confirmationHelpDialog: {
                title: "Información: Pantalla de confirmación",
                content:
                    "Esta pantalla muestra que su voto se ha emitido correctamente. La información proporcionada en esta página le permite verificar que la papeleta ha sido almacenada en la urna , este proceso puede ser ejecutado en cualquier momento durante el periodo de votación y después de que la elección haya sido cerrada.",
                ok: "OK",
            },
            ballotIdHelpDialog: {
                title: "Información: Localizador del Voto",
                content:
                    "El Localizador del Voto de papeleta es un código que le permite encontrar su papeleta en la urna, este Localizador es único y no contiene información sobre sus selecciones.",
                ok: "OK",
            },
        },
    },
}

export default spanishTranslation
