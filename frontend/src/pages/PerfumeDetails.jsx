import ReviewShowcase from "@/components/Home/ReviewShowcase"
import PerfumeNotes from "@/components/ProductDetails/PerfumeNotes"
import PerfumeOverview from "@/components/ProductDetails/PerfumeOverview"
import PerfumeSuggestion from "@/components/ProductDetails/PerfumeSuggestion"
import { Box } from "@chakra-ui/react"


function PerfumeDetails() {
  return (
    <Box pt={{ base: "4rem", md: "6rem" }} px={4}>
      <PerfumeOverview />
      <PerfumeNotes />
      {/* <PerfumeSuggestion /> */}
      {/* <ReviewShowcase /> */}
    </Box>
  )
}

export default PerfumeDetails