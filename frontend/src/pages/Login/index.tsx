import { FormInput } from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router';
import { TypographyH1 } from '@/components/ui/h1';
import { TypographyP } from '@/components/ui/p';

const formLoginSchema = z.object({
  email: z.email({ message: 'Email is required' }),
  password: z.string().min(8, { message: 'Password is required' }),
});

export function Login(): ReactElement {
  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formLoginSchema>) {
    console.log(values);
  }

  return (
    <div className="flex h-svh w-svw flex-col items-center justify-center">
      <TypographyH1 className="mb-10">
        Log in into Photo Management
      </TypographyH1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col items-center gap-2 p-4">
            <FormInput label="Email" name="email" placeholder="Email" />
            <FormInput
              label="Password"
              name="password"
              placeholder="Password"
            />

            <Button type="submit" className="mt-2 w-full">
              Log in
            </Button>
          </div>
        </form>
      </Form>

      <Link to="/sign-up">
        <TypographyP className="underline">
          Don't have an account? Sign up
        </TypographyP>
      </Link>
    </div>
  );
}
