import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import CreateIdeaForm from './components/CreateIdeaForm/CreateIdeaForm';
import DeleteIdeaForm from './components/DeleteIdeaForm';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/ui/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

async function getGiftsAsync() {
  const gifts = await prisma.gift.findMany();

  return gifts;
}

export default async function Ideas() {
  const gifts = await getGiftsAsync();

  return (
    <main className='flex min-h-screen flex-col gap-3 p-24'>
      <PageHeader>
        <PageHeaderHeading>Your gift ideas</PageHeaderHeading>
        <PageHeaderDescription>Share your ideas here!</PageHeaderDescription>
      </PageHeader>
      <div className='flex flex-wrap gap-4'>
        <Card className='h-[354px] w-64'>
          <CardHeader>
            <CardTitle>Create a new idea</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateIdeaForm />
          </CardContent>
        </Card>
        {gifts.map((g, i) => (
          <Card key={g.id} className='relative w-64'>
            <CardHeader>
              {!!g.imageUrl ? (
                <div className='relative h-[207px] w-[207px]'>
                  <Image
                    className='rounded-sm object-cover'
                    src={g.imageUrl}
                    alt={`${g.description} preview`}
                    placeholder='blur'
                    blurDataURL={g.imageUrl}
                    fill
                  />
                </div>
              ) : (
                <Skeleton className='h-[207px] w-[207px] rounded-sm' />
              )}
            </CardHeader>
            <CardContent>
              <p className='truncate' title={g.description}>
                {i + 1}. {g.description}
              </p>
              <p>Created: {g.createdAt.toLocaleDateString()}</p>
              <DeleteIdeaForm
                ideaId={g.id}
                idea={g.description}
                className='absolute right-4 top-4'
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
