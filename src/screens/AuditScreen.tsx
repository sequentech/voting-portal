// SPDX-FileCopyrightText: 2023 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import React, {useState} from "react"
import {Box} from "@mui/material"
import {useTranslation} from "react-i18next"
import {
    Icon,
    PageLimit,
    BreadCrumbSteps,
    BallotHash,
    Dialog,
    IconButton,
    WarnBox,
    stringToHtml,
    theme,
} from "ui-essentials"
import {styled} from "@mui/material/styles"
import Button from "@mui/material/Button"
import {
    faPrint,
    faAngleRight,
    faCircleQuestion,
    faDownload,
} from "@fortawesome/free-solid-svg-icons"
import {Link as RouterLink} from "react-router-dom"
import {Typography} from "@mui/material"

const EXAMPLE_AUDITABLE_BALLOT = `{"ballot_hash":"d07955d0a6a0d1f06d99323b02275f94dace3ef012d942a19b1acedba9948669","choices":[{"alpha":"35085481782252877459308286302572052010404030664333816164071397003095529597497227106621986012791849939895480398452386791753940307548721859137430957001692828597049568340087580380773203487345029775177300032504125275339019860278006856177684238505900809791812310175614395325013502371013268713208522093604486304271211134336255370119257176158103265028799279923654880344013461620586644394251597063107538551042066478437571295319729138166708107852234171060575284393847549713012746206622927826652731517954365560097081051609843781250844848571044653523682080184587543378949942618230306018702813253784253221526328840958608733814336","beta":"13258274107222363772926818292646385811196813348222460093075996987040381388970976834764720666199230675468720145924939284876439899541151916451176876943710313677953556905742300773104933264811977616230170484925614979072658157917032809750553090990563557785785575761803181472780815925200120759179215908288690261445168642927882833886753092590007259849934666329344420320979008501117071304040090059916762746675442226320614700029219269819610055140421479900738694557287783051292002406234570980012240247971201354835665777000141706311251222302258394185249019188159573551457465777709897767748350185120364433024496448427790560846615","plaintext":"2","randomness":"10387885777252415399114550438787959009153481376235992220787794786128529587343180135392620906906082717760123181067688750216872171621890885888048808783190045525369448633776526020282940065561758810860299825553074721943218291422557836861648618695735740355573743363837960380468798627498839482366163760972566225453907799392322657655809785748521238536452451140058831370863615623372216263982284720999505205627225704541786416735725221614571525585824738261507935329927936456413906758713353190434642217312691877935685668730801389148671568158299083717039772054468172869946350624198404174999371880571605755244495346224646057941118"}],"election_url":"https://felix-dev.sequentech.io/elections/api/election/34570001","issue_date":"01/08/2023","proofs":[{"challenge":"77237361218536160215201941889860373318910266093150975434655629880042866680446","commitment":"43633537483035272481189438077978110597019860367498953685926700792934977268661330587247159270332329415652500462027310398056332439007897222767418865043512715242865847315142656912423708763412293732072275081397143568730396283497650812726854674520655150654054744696999847148237039225476758585987664105791010069598972694199976424494268668033586369652002748003100637686573245029717834010880424840742114232093172853685122258601959668039647889093974450482726433885689595907166917525427660068096925712702840955401700720172375316704836876169495592560020794564141446902204442541735385224184863927261413452608967431119675950010289","response":"14265949188171619430481428298960451800635196661006003350729497252014426889662412996735675687284061231901009911260131279300470858967461226688369571025830831142998195460834892019244165589472595303180110216716681619068962763428624846815802788653181618993439636051777945407916303887510945140934397092422867646631216683605091481028031059819549124094523423724655329247081546016117695682390732479310260492813165068655306727487221298273013405390552740185988988665719877677204611523594793716347007079391281919611374447307015246110369862500573182250491026476681673014733435250879303233182508041018901107837200028998845426023788"}]}"`

const ActionsContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 2px;
`

const StyledButton = styled(Button)`
    display flex;
    padding: 5px;

    span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 5px;
    }
`

const StyledTitle = styled(Typography)`
    margin-top: 25.5px;
    display: flex;
    flex-direction: row;
    gap: 16px;
`

const StyledLink = styled(RouterLink)`
    margin: auto 0;
    text-decoration: none;
`

const Step1Container = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const AuditableBallotData = styled(Box)`
    word-break: break-word;
    hyphens: auto;
    padding: 15px;
    background-color: #ecfdf5;
    color: #000;
    border-radius: 4px;
    display: block;
    overflow-y: scroll;
    max-height: 200px;
    border: 1px solid #047857;
    margin: 4px 0;
`

const ActionButtons: React.FC = ({}) => {
    const {t} = useTranslation()
    const triggerPrint = () => window.print()

    return (
        <ActionsContainer>
            <StyledButton
                onClick={triggerPrint}
                variant="secondary"
                sx={{margin: "auto 0", width: {xs: "100%", sm: "200px"}}}
            >
                <Icon icon={faPrint} size="sm" />
                <Box>{t("auditScreen.printButton")}</Box>
            </StyledButton>
            <StyledLink to="/" sx={{margin: "auto 0", width: {xs: "100%", sm: "200px"}}}>
                <StyledButton sx={{width: {xs: "100%", sm: "200px"}}}>
                    <Box>{t("auditScreen.restartButton")}</Box>
                    <Icon icon={faAngleRight} size="sm" />
                </StyledButton>
            </StyledLink>
        </ActionsContainer>
    )
}

export const AuditScreen: React.FC = () => {
    const {t} = useTranslation()
    const [openBallotIdHelp, setOpenBallotIdHelp] = useState(false)

    return (
        <PageLimit maxWidth="lg">
            <BallotHash
                hash="eee6fe54bc8a5f3fce2d2b8aa1909259ceaf7df3266302b7ce1a65ad85a53a92"
                onHelpClick={() => setOpenBallotIdHelp(true)}
            />
            <Box marginTop="24px">
                <Dialog
                    handleClose={() => setOpenBallotIdHelp(false)}
                    open={openBallotIdHelp}
                    title={t("reviewScreen.ballotIdHelpDialog.title")}
                    ok={t("reviewScreen.ballotIdHelpDialog.ok")}
                    cancel={t("reviewScreen.ballotIdHelpDialog.cancel")}
                    variant="info"
                >
                    {stringToHtml(t("reviewScreen.ballotIdHelpDialog.content"))}
                </Dialog>
                <BreadCrumbSteps
                    labels={[
                        "breadcrumbSteps.ballot",
                        "breadcrumbSteps.review",
                        "breadcrumbSteps.confirmation",
                        "breadcrumbSteps.audit",
                    ]}
                    selected={3}
                    warning={true}
                />
            </Box>
            <StyledTitle variant="h4" fontSize="24px">
                <Box>{t("auditScreen.title")}</Box>
                <IconButton
                    icon={faCircleQuestion}
                    sx={{fontSize: "unset", lineHeight: "unset", paddingBottom: "2px"}}
                    fontSize="16px"
                />
            </StyledTitle>
            <Typography variant="body2" sx={{color: theme.palette.customGrey.main}}>
                {stringToHtml(t("auditScreen.description"))}
            </Typography>
            <StyledTitle variant="h5" fontWeight="bold" fontSize="18px">
                <Box>{t("auditScreen.step1Title")}</Box>
                <IconButton
                    icon={faCircleQuestion}
                    sx={{fontSize: "unset", lineHeight: "unset", paddingBottom: "2px"}}
                    fontSize="16px"
                />
            </StyledTitle>
            <Step1Container>
                <Typography variant="body2" sx={{color: theme.palette.customGrey.main}}>
                    {stringToHtml(t("auditScreen.step1Description"))}
                </Typography>
                <StyledButton sx={{width: {xs: "100%", sm: "200px"}}}>
                    <Icon icon={faDownload} size="sm" />
                    <Box sx={{display: {xs: "none", md: "flex"}}}>
                        {t("auditScreen.downloadButton")}
                    </Box>
                </StyledButton>
            </Step1Container>
            <AuditableBallotData>{EXAMPLE_AUDITABLE_BALLOT}</AuditableBallotData>
            <StyledTitle variant="h5" fontWeight="bold" fontSize="18px">
                <Box>{t("auditScreen.step2Title")}</Box>
                <IconButton
                    icon={faCircleQuestion}
                    sx={{fontSize: "unset", lineHeight: "unset", paddingBottom: "2px"}}
                    fontSize="16px"
                />
            </StyledTitle>
            <Typography variant="body2" sx={{color: theme.palette.customGrey.main}}>
                {stringToHtml(t("auditScreen.step2Description"))}
            </Typography>
            <Box margin="15px 0 25px 0">
                <WarnBox variant="warning">{stringToHtml(t("auditScreen.bottomWarning"))}</WarnBox>
            </Box>
            <ActionButtons />
        </PageLimit>
    )
}
