import { Grid } from "@/components/grid/Grid";
import { Header } from "@/components/header/Header";

const TEST_DATA = [
    {
        id:1,
        url:"https://i.pinimg.com/736x/48/ad/82/48ad821ca4ef5b357193161d74b848b0.jpg",
        title: "-US- Jennifer Nguyen"
    },
    {
        id:2,
        url: "https://i.pinimg.com/736x/0f/54/50/0f545014a699daf452af1901afc11db0.jpg",
        title: "Makima"
    },
    {
        id:3,
        url:"https://i.pinimg.com/736x/32/83/42/328342f70dd1949aa285c201ca0798a7.jpg",
        title: ""
    },
    {
        id:4,
        url:"https://i.pinimg.com/736x/89/1a/41/891a4167ec39769a4bc2b3de9b9a5328.jpg",
        title: ""
    },
    {
        id:5,
        url:"https://i.pinimg.com/736x/f5/57/b0/f557b0f2692bf83189abbc294ad7d0e5.jpg",
        title: "Minh Hà Quang"
    },
    {
        id:6,
        url:"https://i.pinimg.com/736x/61/3d/d2/613dd249d9952b326eb972d628720f18.jpg",
        title: "bald juleq"
    },
    {
        id:7,
        url:"https://i.pinimg.com/736x/c8/72/f4/c872f49763f09360b8fd88222ef1186a.jpg",
        title: "Miss UltraVioleta"
    },
    {
        id:8,
        url:"https://i.pinimg.com/736x/c6/16/e1/c616e1981e81fbc28d266991c205840c.jpg",
        title: "Ebrahim Saban"
    },
    {
        id:9,
        url:"https://i.pinimg.com/736x/2a/c5/27/2ac527e3618bf933810446b30aa6638f.jpg",
        title: "🌼Kaoru Hana Wa Rin To Saku🌼"
    },
    {
        id:10,
        url:"https://i.pinimg.com/736x/f6/57/12/f65712857e1fd1725747c8e49c46e6e6.jpg",
        title: "gan thummim"
    },
    {
        id:11,
        url:"https://i.pinimg.com/736x/62/fd/95/62fd958acf3cf854ce7f2c11fbd32f60.jpg",
        title: "Lusine Hayrapetyan"
    },
    {
        id:12,
        url:"https://i.pinimg.com/736x/c3/dc/74/c3dc7408a42106c59c2ad9a8c8310d3d.jpg",
        title: "hamayza : Guts wallpaper"
    },
    {
        id:13,
        url:"https://i.pinimg.com/736x/c3/dc/74/c3dc7408a42106c59c2ad9a8c8310d3d.jpg",
        title: "hamayza : Guts wallpaper test test test test test test test test"
    },
    {
        id:14,
        url:"https://i.pinimg.com/736x/6b/cd/da/6bcddaab2a2dbdd11c832ac08d742626.jpg",
        title: "Softwild"
    },
    {
        id:15,
        url:"https://i.pinimg.com/736x/d1/0e/9c/d10e9c8ec4ae9c180945ff9fc70ef09b.jpg",
        title: "day glo"
    },
    {
        id:16,
        url:"https://i.pinimg.com/736x/10/1b/79/101b79aeb1fe094cb7fbcf7004a81d88.jpg",
        title: "Hands and flowers"
    },
    {
        id:17,
        url:"https://i.pinimg.com/736x/a8/2a/86/a82a86130c8230ac8d97083a9086fba6.jpg",
        title: "sakura skull"
    },
    {
        id:18,
        url:"https://i.pinimg.com/736x/ab/6c/ff/ab6cff218fda46ddcc41494481cd2401.jpg",
        title: "La_reina_mweni"
    },
    {
        id:19,
        url:"https://i.pinimg.com/736x/ab/6c/ff/ab6cff218fda46ddcc41494481cd2401.jpg",
        title: "La_reina_mweni : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quos consequatur facere molestias culpa voluptatem quasi, consectetur ipsum autem porro vel tenetur rem quas aliquid dolorum nesciunt delectus recusandae perferendis!"
    },
];

export function Home(){
    return(
        <>
            <Header />
            <main className="container mx-auto">
                <Grid cards={TEST_DATA}/>
            </main>
        </>
    )
}