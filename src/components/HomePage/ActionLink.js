const ActionLink = () => {

  const handleClick = (e) => {
    e.preventDefault();
    console.log('The link was clicked.');
  };

  return handleClick
}

export default ActionLink;