import { NextResponse } from "next/server";
import { main } from "../route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ブログの詳細取得API
export const GET = async (req: Request,res: NextResponse) => {
    try{

        const id:number = parseInt (req.url.split("/blog/")[1]); //ここのsplitと[1]の意味と使い方復習しとこう
                        //ここのparseInt()とすると整数と認識される

        await main();

        const post = await prisma.post.findFirst({where: {id}}); //ここのpostは/schema.prismaのPostが小文字になったもの
        return NextResponse.json({message:"Success",post},{status: 200});
        // 今までは res.jsonって書いたりしてたがnextjs13からNextResponsになった。注意！
    }catch(err) {
        return NextResponse.json({message: "Error",err},{status: 500});
    }finally{
        await prisma.$disconnect();
    }

};



// ブログの記事編集API
export const PUT = async (req: Request,res: NextResponse) => {
    try{

        const id:number = parseInt (req.url.split("/blog/")[1]); //ここのsplitと[1]の意味と使い方復習しとこう
                        //ここのparseInt()とすると整数と認識される

        const { title , description} = await req.json();


        await main();

        const post = await prisma.post.update({
            data:{title , description},
            where:{id},

        }); 
        
        
        
        return NextResponse.json({message:"Success",post},{status: 200});
        // 今までは res.jsonって書いたりしてたがnextjs13からNextResponsになった。注意！
    }catch(err) {
        return NextResponse.json({message: "Error",err},{status: 500});
    }finally{
        await prisma.$disconnect();
    }

};



//削除用API
export const DELETE = async (req: Request,res: NextResponse) => {
    try{

        const id:number = parseInt (req.url.split("/blog/")[1]); //ここのsplitと[1]の意味と使い方復習しとこう
                        //ここのparseInt()とすると整数と認識される

        


        await main();

        const post = await prisma.post.delete({

            where:{id},

        });

    
        
        
        
        return NextResponse.json({message:"Success",post},{status: 200});
        // 今までは res.jsonって書いたりしてたがnextjs13からNextResponsになった。注意！
    }catch(err) {
        return NextResponse.json({message: "Error",err},{status: 500});
    }finally{
        await prisma.$disconnect();
    }

};