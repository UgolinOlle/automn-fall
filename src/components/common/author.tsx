/**
 * @function Author
 * @description Author component to display the author's information.
 * @exports Author
 */
export const Author: React.FC = () => {
  // --- Render
  return (
    <span className="absolute bottom-0 left-0 right-0 mx-auto w-full max-w-2xl text-center italic text-secondary">
      Photo by{' '}
      <a href="https://unsplash.com/@fedechanw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
        Federica Galli
      </a>{' '}
      on{' '}
      <a href="https://unsplash.com/photos/brown-trees-pF1ug8ysTtY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
        Unsplash
      </a>
    </span>
  )
}
