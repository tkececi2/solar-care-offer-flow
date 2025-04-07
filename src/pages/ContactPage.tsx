
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { Phone, Mail, MapPin, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakterden oluşmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().optional(),
  subject: z.string().min(2, "Konu en az 2 karakterden oluşmalıdır"),
  message: z.string().min(10, "Mesaj en az 10 karakterden oluşmalıdır"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(data: FormValues) {
    console.log("İletişim formu gönderildi:", data);
    toast.success("Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.");
    form.reset();
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">İletişim</h1>
            <p className="text-xl text-muted-foreground">
              Sorularınız veya talepleriniz için bizimle iletişime geçebilirsiniz.
              Size en kısa sürede dönüş yapacağız.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Sol Kolon - İletişim Bilgileri */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">İletişim Bilgilerimiz</h2>
                <p className="text-muted-foreground mb-8">
                  GES bakım ve işletme hizmetleri hakkında detaylı bilgi almak 
                  için aşağıdaki iletişim kanallarından bize ulaşabilirsiniz.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Phone className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">Telefon</h3>
                      <p className="text-muted-foreground">+90 212 555 4433</p>
                      <p className="text-muted-foreground">+90 533 444 5566</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Mail className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">E-posta</h3>
                      <p className="text-muted-foreground">info@gesbakım.com</p>
                      <p className="text-muted-foreground">destek@gesbakım.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <MapPin className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">Adres</h3>
                      <p className="text-muted-foreground">
                        Yenilenebilir Enerji Merkezi, Kat: 5<br />
                        Maslak, İstanbul, Türkiye
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-8 border-t border-border">
                <h3 className="text-xl font-semibold mb-4">Çalışma Saatlerimiz</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Pazartesi - Cuma:</span>
                    <span>09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Cumartesi:</span>
                    <span>09:00 - 13:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Pazar:</span>
                    <span>Kapalı</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sağ Kolon - İletişim Formu */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-border">
              <h2 className="text-2xl font-bold mb-6">Bize Ulaşın</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ad Soyad</FormLabel>
                        <FormControl>
                          <Input placeholder="Adınız ve soyadınız" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-posta</FormLabel>
                          <FormControl>
                            <Input placeholder="E-posta adresiniz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefon</FormLabel>
                          <FormControl>
                            <Input placeholder="Telefon numaranız" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Konu</FormLabel>
                        <FormControl>
                          <Input placeholder="Mesajınızın konusu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mesajınız</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Mesajınızı detaylı bir şekilde yazınız" 
                            className="min-h-[150px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Mesaj Gönder
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Harita Bölümü */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-muted h-[400px] rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">Harita görüntüsü burada yer alacak</p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
