/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'images.pexels.com',    
            }
        ]
    }
};

//così è possibile poter importare immagini esterne da un sito, specificando l'host name da dove proviene l'img,
//dentro remotePAtterns possiamo specificare più di un obj con le specifiche del sito

export default nextConfig;
