import { ImageList, ImageListItem } from "@mui/material";

export const ImgGallery=({images})=> {
    if(!images)return;
    return (
        <ImageList sx={{ width: '100%', height: 480, mt: '20px' }} cols={4} rowHeight={164}>
            {images.map((img) => (
                <ImageListItem key={img}>
                    <img
                        src={`${img}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt='img'
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}
