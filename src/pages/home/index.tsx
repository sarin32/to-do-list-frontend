import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

const featureList = [
  {
    title: 'Simple & Intuitive',
    description:
      'Easily add, organize, and complete tasks with our user-friendly interface.',
  },
  {
    title: 'Cross-Platform Sync',
    description: 'Access your to-do list from any device, anywhere, anytime.',
  },
];

export function Home() {
  return (
    <section className="p-4">
      <h3 className="text-lg font-bold mb-2 text-center sm:text-left">
        Welcome to ClearList
      </h3>
      <p className="text-base mb-4 opacity-70 text-center sm:text-left">
        Your ultimate task management solution
      </p>
      <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
        {featureList.map((elem, index) => (
          <Card key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
            <CardHeader>
              <CardTitle>{elem.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="opacity-60">{elem.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
