
import CreateReview from "@/components/ProductDetails/CreateReview"
import PerfumeNotes from "@/components/ProductDetails/PerfumeNotes"
import PerfumeOverview from "@/components/ProductDetails/PerfumeOverview"
import PerfumeReview from "@/components/ProductDetails/PerfumeReview"

import { Box } from "@chakra-ui/react"
import { Fragment } from "react"

function PerfumeDetails() {
  return (
    <Box pt={{ base: "4rem", md: "6rem" }} px={4}>
        <PerfumeOverview />
        <PerfumeNotes />
        <CreateReview />
    </Box>
  )
}

export default PerfumeDetails
