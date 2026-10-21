import { z } from 'zod';

export const enquirySchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Valid email required' }),
  phone: z.string().min(10, { message: 'Valid 10-digit phone required' }).optional(),
  entitySlug: z.string().min(1, { message: 'Please specify the entity or sector' }),
  message: z.string().min(10, { message: 'Enquiry message must contain at least 10 characters' }),
  audienceType: z
    .enum([
      'builder-architect',
      'homebuyer-tenant',
      'shopper-diner',
      'brand-buyer',
      'investor-partner',
      'job-seeker',
      'general',
    ])
    .default('general'),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
