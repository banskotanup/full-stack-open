const Notification = ({ message, isSuccess, isError }) => {
    if (message === null) {
        return null
    }
    return (
        <div className={isSuccess ? "success" : isError ? "error" : ""}>
            <p>
                {message}
            </p>
        </div>
    )
}

export default Notification;