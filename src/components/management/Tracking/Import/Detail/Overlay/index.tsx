import React, { createRef } from "react"

import  { Container } from "./styles"
import { ActivityIndicator } from "../Complaint/styles"

export const overlayRef = createRef<HTMLDivElement>()

const Overlay = () => {

    return (
        <Container ref={overlayRef}>
          <ActivityIndicator/>
        </Container>
    )
}

export default Overlay