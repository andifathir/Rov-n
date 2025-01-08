
import CreateReview from "@/components/ProductDetails/CreateReview"
import PerfumeNotes from "@/components/ProductDetails/PerfumeNotes"
import PerfumeOverview from "@/components/ProductDetails/PerfumeOverview"

import { Box } from "@chakra-ui/react"
import { Fragment } from "react"

function PerfumeDetails() {
  return (
    <Box pt={{ base: "4rem", md: "6rem" }} px={4}>
      <Fragment>
        <PerfumeOverview />
        <PerfumeNotes />
        <CreateReview />
      </Fragment>
    </Box>
  )
}

export default PerfumeDetails
