/**
 * @function Author
 * @description Author component to display the author's information.
 * @exports Author
 */
export const Author: React.FC = () => {
  // --- Render
  return (
    <span className="absolute bottom-5 left-auto right-auto italic text-secondary">
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
