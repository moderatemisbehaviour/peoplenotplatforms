function useResultsKeyboardNavigation(
  resultRefs,
  firstResultOnKeyUp,
  currentlySelectedIndex,
  setCurrentlySelectedIndex
) {
  function onKeyUp(event) {
    event.stopPropagation()

    if (event.key === 'ArrowUp') {
      if (currentlySelectedIndex === 0) {
        firstResultOnKeyUp()
      } else {
        setCurrentlySelectedIndex(currentlySelectedIndex - 1)
      }
    } else if (event.key === 'ArrowDown') {
      const lastResultIndex =
        resultRefs.filter(result => !!result.current).length - 1
      setCurrentlySelectedIndex(
        Math.min(currentlySelectedIndex + 1, lastResultIndex)
      )
    }
  }

  return onKeyUp
}

export default useResultsKeyboardNavigation
