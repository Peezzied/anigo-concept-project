<script lang="ts" setup>
import GenericHeader from '@/components/GenericHeader.vue';
import NavigationBar from '@/components/NavigationBar.vue';
import { FormField } from '@/components/ui/form';
import FormControl from '@/components/ui/form/FormControl.vue';
import FormItem from '@/components/ui/form/FormItem.vue';
import FormLabel from '@/components/ui/form/FormLabel.vue';
import Input from '@/components/ui/input/Input.vue';
import Label from '@/components/Label.vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Textarea from '@/components/ui/textarea/Textarea.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import InfoHover from '@/components/InfoHover.vue';
import { Icon } from '@iconify/vue';
import AgreementTicker from '@/components/AgreementTicker.vue';
import { z } from 'zod';
import { Form, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { watch } from 'vue';
import FormMessage from '@/components/ui/form/FormMessage.vue';

// -----------------------
// Inquiry Form Schema
// -----------------------
const rawInquiryFormSchema = z.object({
  name: z.string(),
  email: z.string().email("Must be a valid email"),
  subject: z.string(),
  type: z.string(),
  concern: z.string().min(10, "Tell us at least 10 characters"),
  agreement: z.boolean().refine(val => val === true),
})
const inquiryFormSchema = toTypedSchema(rawInquiryFormSchema);

type InquiryForm = z.infer<typeof rawInquiryFormSchema>

// -----------------------
// Vendor Form Schema
// -----------------------
const rawVendorFormSchema = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string().length(11, "Must be a valid phone number"),
  email: z.string().email("Must be a valid email"),
  additionalInfo: z.string(),
  agreement: z.boolean().refine(val => val === true),
})
const vendorFormSchema = toTypedSchema(z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string().length(11, "Must be a valid phone number"),
  email: z.string().email("Must be a valid email"),
  additionalInfo: z.string(),
  agreement: z.boolean().refine(val => val === true),
}));

type VendorForm = z.infer<typeof rawVendorFormSchema>


const onVendorSubmit = (values: VendorForm) => {
  console.log('vendor', values)
  fetch("https://sheetdb.io/api/v1/5xi14820e22dn?sheet=applications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [
        {
          name: values.name,
          address: values.address,
          phone: values.phone,
          email: values.email,
          info: values.additionalInfo,
        }
      ]
    })
  })
    .then(res => res.json())
    .then(console.log)
    .catch(console.error);
}

const onInquirySubmit = (values: InquiryForm) => {
  console.log('inquiry', values)
  fetch("https://sheetdb.io/api/v1/5xi14820e22dn?sheet=Inquries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [
        {
          name: values.name,
          email: values.email,
          subject: values.subject,
          type: values.type,
          concern: values.concern,
        }
      ]
    })
  })
    .then(res => res.json())
    .then(console.log)
    .catch(console.error);
}


</script>

<template>
  <NavigationBar colored />
  <GenericHeader class="grid" first-section="col-1 row-span-3">
    <h1 class="text-5xl text-primary-50 ">Contacts</h1>
  </GenericHeader>
  <main>
    <article class="container flex gap-7 *:flex-1 h-[40em]">
      <section class="pt-7">
        <div>
          <Label>Get in touch</Label>
          <h1 class="leading-20">Let's work together</h1>
          <p>We're here to help with whatever you need. If you're a customer, reach out for support with orders,
            deliveries, payments, or any questions about using our platform. If you're a local palengke vendor, learn
            how
            you can join our free platform, reach more customers, and grow your business digitally.</p>
        </div>
        <div
          class="grid grid-cols-2 gap-4 mt-15 *:rounded-sm *:bg-[#f7f3e0] *:p-5 *:px-6 *:space-y-4 [&_div_div]:opacity-90 [&_p]:opacity-90 ">
          <div>
            <h2 class="font-semibold">
              <Icon icon="mdi:location" class="inline size-5" /> Our place
            </h2>
            <p>1338 Arlegui St., Quiapo, Manila</p>
          </div>
          <div>
            <h2 class="font-semibold">
              <Icon icon="mingcute:phone-call-fill" class="inline size-5" /> Contact Numbers
            </h2>
            <div>
              <p>Phone No: +63 9479811614</p>
              <p>Tel. No: (02) 8911-0964</p>
            </div>
          </div>
          <div>
            <h2 class="font-semibold">
              <Icon icon="ic:round-email" class="inline size-5" /> Email
            </h2>
            <p>tugunan@anigo.ph</p>
          </div>
          <div>
            <h2 class="font-semibold">
              <Icon icon="icon-park-solid:phone" class="inline size-4" /> Socials
            </h2>
            <div class="flex gap-4 *:size-5">
              <Icon icon="ic:baseline-facebook" />
              <Icon icon="mdi:instagram" />
              <Icon icon="prime:twitter" />
            </div>
          </div>
        </div>
      </section>
      <section class="px-4 ">
        <Tabs>
          <TabsList class="w-full shadow-md bg-[#f7eae0]">
            <TabsTrigger value="inquiry">
              General Inquiry
            </TabsTrigger>
            <TabsTrigger value="vendor">
              Become a vendor
              <InfoHover>
                <div class="bg-white">asd</div>
              </InfoHover>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="inquiry">
            <Form class="mt-8 px-4" @submit="onInquirySubmit" :validation-schema="inquiryFormSchema">
              <div class="grid grid-cols-2 gap-3 gap-y-5">
                <!-- Name -->
                <FormField name="name" v-slot="{ componentField }">
                  <FormItem class="col-span-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <!-- Email -->
                <FormField name="email" v-slot="{ componentField }">
                  <FormItem class="col-span-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email Address" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <!-- Subject -->
                <FormField name="subject" v-slot="{ componentField }">
                  <FormItem>
                    <FormLabel aria-required="true">Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Inquiry Name" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <!-- Type -->
                <FormField name="type" v-slot="{ componentField }">
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Inquiry Type" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <!-- Concern -->
                <FormField name="concern" v-slot="{ componentField }">
                  <FormItem class="col-span-full">
                    <FormLabel>Tell us about your concern</FormLabel>
                    <FormControl>
                      <Textarea v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>
              <div class="flex flex-col gap-4 mt-10">
                <AgreementTicker name="agreement">
                  I have read the<a href="" class="text-clickable underline">Privacy and Policy</a>
                </AgreementTicker>
                <button type="submit" class="bg-secondary text-white p-3 rounded-md font-medium w-full">Submit</button>
              </div>
            </Form>
          </TabsContent>

          <TabsContent value="vendor">
            <Form class="mt-8 px-4" @submit="onVendorSubmit" :validation-schema="vendorFormSchema">
              <div class="grid grid-cols-2 gap-3 gap-y-5">
                <!-- Name -->
                <FormField name="name" v-slot="{ componentField }">
                  <FormItem class="col-span-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <!-- Address -->
                <FormField name="address" v-slot="{ componentField }">
                  <FormItem class="col-span-full">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Address" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <!-- Phone -->
                <FormField name="phone" v-slot="{ componentField }">
                  <FormItem class="col-span-full">
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone Number" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <!-- Email -->
                <FormField name="email" v-slot="{ componentField }">
                  <FormItem class="col-span-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email Address" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <!-- Additional info -->
                <FormField name="additionalInfo" v-slot="{ componentField }">
                  <FormItem class="col-span-full">
                    <FormLabel>Additional information</FormLabel>
                    <FormControl>
                      <Textarea v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>

              <div class="flex flex-col gap-4 mt-10">
                <AgreementTicker name="agreement">
                  I have read the<a href="" class="text-clickable underline">Privacy and Policy</a>
                </AgreementTicker>
                <button type="submit" class="bg-secondary text-white p-3 rounded-md font-medium w-full">Submit</button>
              </div>
            </Form>
          </TabsContent>

        </Tabs>

      </section>
    </article>
  </main>
</template>
