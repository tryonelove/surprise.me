import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import CreateIdeaForm from './CreateIdeaForm';
import { ScrollArea } from '@/components/ui/scroll-area';
import DeleteIdeaForm from './DeleteIdeaForm';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/ui/page-header';

async function getGiftsAsync() {
  const gifts = await prisma.gift.findMany();

  return gifts;
}

export default async function Ideas() {
  const gifts = await getGiftsAsync();

  return (
    <main className='flex min-h-screen flex-col justify-between p-24'>
      <PageHeader>
        <PageHeaderHeading>Your gift ideas</PageHeaderHeading>
        <PageHeaderDescription>Share your ideas here!</PageHeaderDescription>
      </PageHeader>
      <Card className='min-w-[460px]'>
        <CardHeader>
          <CardTitle>Your gift ideas</CardTitle>
          <CardDescription>Share your ideas here!</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-2'>
          <CreateIdeaForm />
          <ScrollArea className='h-96'>
            <div className='flex flex-col gap-1 pr-3 justify-center'>
              {gifts.map((g, i) => (
                <div key={g.id} className='flex justify-between items-center'>
                  <p>
                    {i + 1}. {g.description}
                  </p>
                  <DeleteIdeaForm ideaId={g.id} idea={g.description} />
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </main>
  );
}
