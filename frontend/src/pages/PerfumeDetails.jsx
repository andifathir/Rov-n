import PerfumeNotes from "@/components/ProductDetails/PerfumeNotes"
import PerfumeOverview from "@/components/ProductDetails/PerfumeOverview"
import { Box } from "@chakra-ui/react"


function PerfumeDetails() {
  return (
    <Box pt={{ base: "4rem", md: "6rem" }} px={4}>
      <PerfumeOverview />
      <PerfumeNotes />
    </Box>
  )
}

export default PerfumeDetails