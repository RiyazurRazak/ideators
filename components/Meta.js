import Head from 'next/head'

function Meta({title , description , keywords , author}) {
    return (
        <>
          <Head>
            <title>{title}</title>
            <meta charSet="UTF-8" />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel='icon' href="/favicon.ico" />
          </Head>   
        </>
    )
}


Meta.defaultProps = {
    title: "ideators",
    description: 'ideators is an platform for both ideators and investors. ideators post their ideas and investors choose their correct ideator to invest their money',
    keywords: "Riyazur Razak, React js, hackathon, ideators, javascript, portfolio",
    author:"Riyazur Razak"
}

export default Meta
