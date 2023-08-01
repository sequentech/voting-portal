import React, {ReactNode} from "react"
import sanitizeHtml from 'sanitize-html'
import parse from 'html-react-parser'

export const stringToHtml = (html: string): ReactNode => parse(sanitizeHtml(html))