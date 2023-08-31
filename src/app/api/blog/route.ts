import {  PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function main ()  {
    try{
        await prisma.$connect();
        //これでDBに接続される
    }catch(err) {
        return Error("DB接続に失敗しました")
    }
}

// ブログの全記事取得API
export const GET = async (req: Request,res: NextResponse) => {
    try{
        await main();

        const posts = await prisma.post.findMany(); //ここのpostは/schema.prismaのPostが小文字になったもの
        return NextResponse.json({message:"Success",posts},{status: 200});
        // 今までは res.jsonって書いたりしてたがnextjs13からNextResponsになった。注意！
    }catch(err) {
        return NextResponse.json({message: "Error",err},{status: 500});
    }finally{
        await prisma.$disconnect();
    }

};


// ブログ投稿用API
export const POST = async (req: Request,res: NextResponse) => {
    try{

        const { title , description } = await req.json();
        // 以前は req.bodyとかで取り出していたが,
        // Nextjs13になってreq.json()に変わった。

        await main();

        const post = await prisma.post.create({data:{title, description}});
        return NextResponse.json({message:"Success",post},{status: 201});
        
    }catch(err) {
        return NextResponse.json({message: "Error",err},{status: 500});
    }finally{
        await prisma.$disconnect();
    }

};