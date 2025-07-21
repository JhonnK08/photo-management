import { FormInput } from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { TypographyH1 } from '@/components/ui/h1';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const formRegisterSchema = z
  .object({
    name: z.string().min(10, { message: 'Minimum 10 characters' }),
    email: z.email({ message: 'Email is required' }),
    username: z.string().min(8, { message: 'Minimum 8 characters' }),
    password: z.string().min(8, { message: 'Minimum 8 characters' }),
    confirmPassword: z.string(),
  })
  .check((ctx) => {
    if (ctx.value.confirmPassword !== ctx.value.password) {
      ctx.issues.push({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
        input: ctx.value.confirmPassword,
      });
    }
  });

export function Register(): ReactElement {
  const form = useForm<z.infer<typeof formRegisterSchema>>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      confirmPassword: '',
      email: '',
      name: '',
      password: '',
      username: '',
    },
  });

  function onSubmit(values: z.infer<typeof formRegisterSchema>) {
    console.log(values);
  }

  return (
    <div className="flex h-svh w-svw flex-col items-center justify-center">
      <TypographyH1 className="mb-10">Register</TypographyH1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col items-center gap-2 p-4">
            <FormInput label="Name" name="name" placeholder="Name" />
            <FormInput
              label="Username"
              name="username"
              placeholder="Username"
            />
            <FormInput label="Email" name="email" placeholder="Email" />
            <FormInput
              label="Password"
              name="password"
              placeholder="Password"
            />
            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm Password"
            />

            <Button type="submit" className="mt-2 w-full">
              Register
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
