import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/ui/page-header';
import Image from 'next/image';
import { CreateWishForm } from '@/components/create-wish';
import { DeleteWishForm } from '@/components/delete-wish';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wishlist',
};

async function getWishesAsync() {
  const wishes = await prisma.wish.findMany();

  return wishes;
}

export default async function Wishlist() {
  const wishes = await getWishesAsync();

  return (
    <main className='flex min-h-screen flex-col gap-3 p-24'>
      <PageHeader>
        <PageHeaderHeading>Your gift ideas</PageHeaderHeading>
        <PageHeaderDescription>Share your ideas here!</PageHeaderDescription>
      </PageHeader>
      <div className='flex flex-wrap gap-4'>
        <Card className='min-h-[354px] w-64'>
          <CardHeader>
            <CardTitle>Create a new idea</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateWishForm />
          </CardContent>
        </Card>
        {wishes.map((w, i) => (
          <Card key={w.id} className='relative w-64'>
            <CardHeader>
              <div className='relative h-[207px] w-[207px] bg-gray-400'>
                {!!w.imageUrl && (
                  <Image
                    className='rounded-sm object-cover'
                    src={w.imageUrl}
                    alt={`${w.description} preview`}
                    placeholder='blur'
                    blurDataURL={w.imageUrl}
                    fill
                  />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className='truncate' title={w.description}>
                {i + 1}. {w.description}
              </p>
              <p>Created: {w.createdAt.toLocaleDateString()}</p>
              <DeleteWishForm
                key={w.id}
                wish={w}
                className='absolute right-4 top-4'
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
