const Header = (props) => {
    console.log("Course Header: ", props)
    return (
        <h1>{ props.course.name}</h1>
    )
}

export default Header;