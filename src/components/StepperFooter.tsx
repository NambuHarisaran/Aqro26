import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Phone, Mail, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const StepperFooter = () => {
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        if (step === 1 && phone) {
            setStep(2);
        } else if (step === 2 && email) {
            setIsSubmitting(true);
            
            try {
                const formData = new FormData();
                formData.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY);
                formData.append('subject', 'New Contact Request from AQRO Website');
                formData.append('from_name', 'AQRO Website Contact Form');
                formData.append('phone', phone);
                formData.append('email', email);
                formData.append('message', `New contact request:\n\nPhone: ${phone}\nEmail: ${email}`);

                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                
                if (data.success) {
                    setIsSuccess(true);
                } else {
                    setError('Failed to send message. Please try again.');
                }
            } catch (err) {
                setError('Failed to send message. Please try again or email us directly.');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="w-full max-w-md mx-auto my-8">
            <h3 className="text-2xl font-bold text-white mb-2">Start your project</h3>
            <p className="text-gray-400 mb-6">Let's build something extraordinary together.</p>

            {isSuccess ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-primary/20 border border-primary/50 text-white p-6 rounded-2xl flex flex-col items-center text-center gap-4"
                >
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg">Message Sent!</h4>
                        <p className="text-sm text-gray-300">We'll contact you shortly.</p>
                    </div>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="relative">
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center gap-2 text-red-300 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}
                    <div className="flex justify-between mb-4 px-2">
                        <div className={cn("flex items-center gap-2 text-sm font-medium transition-colors", step >= 1 ? "text-blue-400" : "text-gray-400")}>
                            <div className={cn("w-6 h-6 rounded-full flex items-center justify-center border", step >= 1 ? "bg-primary border-primary text-white" : "border-gray-400 text-gray-400")}>1</div>
                            Phone
                        </div>
                        <div className="flex-1 h-px bg-white/10 mx-4 self-center" />
                        <div className={cn("flex items-center gap-2 text-sm font-medium transition-colors", step >= 2 ? "text-blue-400" : "text-gray-400")}>
                            <div className={cn("w-6 h-6 rounded-full flex items-center justify-center border", step >= 2 ? "bg-primary border-primary text-white" : "border-gray-400 text-gray-400")}>2</div>
                            Email
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400 pl-1">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="+91 12345 67890"
                                                className="w-full bg-white/10 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-white/50 transition-colors"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                                    >
                                        Next <ArrowRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400 pl-1">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="hello@email.com"
                                                className="w-full bg-white/10 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-white/50 transition-colors"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="px-4 py-3 text-gray-400 hover:text-white transition-colors"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex-1 bg-primary text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
                                        >
                                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Get Started'}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </form>
            )}
        </div>
    );
};

export default StepperFooter;
