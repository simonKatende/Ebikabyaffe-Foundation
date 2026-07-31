import { BusinessDirectory } from "@/components/businesses/BusinessDirectory";

// /businesses — public Business Owners directory. Browsing needs no account;
// posting a listing happens from /profile (BusinessListingCard), which is
// account-gated the normal way. Linked from the logged-in Home dashboard.
export default function BusinessesPage() {
  return <BusinessDirectory />;
}
