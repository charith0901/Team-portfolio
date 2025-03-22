const MetaData = ({ member }) => {
    return (
        <>
            {/*meta data*/}
            <title>{member.name}</title>
            <meta name="title" content={member.name} />
            <meta
                name="description"
                content={`Portfolio of ${member.name} of DataDragons team showcasing projects and info`}
            />
            <meta
                name="keywords"
                content={`computer science , software engineering ,data science ,team ,projects ,DataDragons ${member.name
                    } 
                        , ${member.username} ,${member.roles && member.roles > 0 && member.roles.join(" , ")
                    }
                        `}
            />
            <meta name="author" content={member.name} />
            <meta name="robots" content="index, follow" />
        </>
    );
};

export default MetaData;