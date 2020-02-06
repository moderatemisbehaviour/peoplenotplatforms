import React from 'react'
import { shallow } from 'enzyme'
import SearchResults from './SearchResults'
import SearchResult from './SearchResult'

const validSearchResults = [
  {
    id: 'a1',
    name: 'Siobhan Wilson',
    image:
      'https://pbs.twimg.com/profile_images/1155313320339103747/MrTMPR_o_400x400.jpg'
  },
  {
    id: 'a2',
    name: 'Siobhan Wilson',
    image:
      'https://pbs.twimg.com/profile_images/1155313320339103747/MrTMPR_o_400x400.jpg'
  },
  {
    id: 'a3',
    name: 'Siobhan Wilson',
    image:
      'https://pbs.twimg.com/profile_images/1155313320339103747/MrTMPR_o_400x400.jpg'
  },
  {
    id: 'a4',
    name: 'Siobhan Wilson',
    image:
      'https://pbs.twimg.com/profile_images/1155313320339103747/MrTMPR_o_400x400.jpg'
  },
  {
    id: 'a5',
    name: 'Siobhan Wilson',
    image:
      'https://pbs.twimg.com/profile_images/1155313320339103747/MrTMPR_o_400x400.jpg'
  }
]

it('renders an li element for each result', () => {
  const wrapper = shallow(
    <SearchResults resultsPerPage={5} searchResults={validSearchResults} />
  )
  expect(wrapper.find(SearchResult)).toHaveLength(5)
})