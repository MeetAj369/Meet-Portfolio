import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Copy, Check, ExternalLink, Clock, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../../common/Icons/BrandIcons';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { isValidEmail } from '../../../utils/helpers';
import { personalInfo, socialLinks } from '../../../data/personalInfo';
import styles from './Contact.module.css';

const Contact = () => {
  const revealRef = useScrollReveal({ children: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const linkedinLink = socialLinks.find(s => s.name === 'LinkedIn');
  const githubLink = socialLinks.find(s => s.name === 'GitHub');

  const handleCopyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      // Draft email in user's default client
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Hi Meet,\n\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`)}`;
      window.location.href = mailtoUrl;

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 8000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <section id="contact" className={styles.contactSection} ref={revealRef}>
      <div className="container">
        <SectionTitle title="Get In Touch" subtitle="Let's build something remarkable together" />

        {/* Floating Toast Notification */}
        {copied && (
          <div className={styles.toast}>
            <Check size={16} />
            <span>Copied {personalInfo.email} to clipboard!</span>
          </div>
        )}
        
        <div className={styles.contactContainer}>
          {/* Form Column */}
          <div className={`${styles.formColumn} reveal`}>
            {submitted ? (
              <div className={styles.successMessage}>
                <div className={styles.successIconWrap}>
                  <Send size={36} className={styles.successIcon} />
                </div>
                <h3>Message Ready to Send!</h3>
                <p>
                  Your email client has been opened with your pre-filled message to <strong>{personalInfo.email}</strong>. 
                  You can also contact me directly via LinkedIn or phone!
                </p>
                <button 
                  onClick={() => setSubmitted(false)} 
                  className={styles.resetFormBtn}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className={`${styles.formInput} ${errors.name ? styles.inputError : ''}`} 
                    placeholder="e.g. Alex Morgan" 
                    aria-invalid={!!errors.name} 
                  />
                  {errors.name && <span className={styles.formError}>{errors.name}</span>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>Your Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className={`${styles.formInput} ${errors.email ? styles.inputError : ''}`} 
                    placeholder="alex@example.com" 
                    aria-invalid={!!errors.email} 
                  />
                  {errors.email && <span className={styles.formError}>{errors.email}</span>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.formLabel}>Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleChange} 
                    className={`${styles.formInput} ${errors.subject ? styles.inputError : ''}`} 
                    placeholder="Project Inquiry / Job Opportunity" 
                    aria-invalid={!!errors.subject} 
                  />
                  {errors.subject && <span className={styles.formError}>{errors.subject}</span>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    className={`${styles.formTextarea} ${errors.message ? styles.inputError : ''}`} 
                    placeholder="Hi Meet, I came across your portfolio and would love to discuss..." 
                    aria-invalid={!!errors.message} 
                  />
                  {errors.message && <span className={styles.formError}>{errors.message}</span>}
                </div>
                
                <button type="submit" className={styles.submitBtn}>
                  <Send size={18} />
                  <span>Send Message Directly</span>
                </button>
              </form>
            )}
          </div>
          
          {/* Info Column */}
          <div className={`${styles.infoColumn} reveal`}>
            <div className={styles.contactInfo}>
              {/* Email with copy button */}
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}><Mail size={20} color="white" /></div>
                <div style={{ flex: 1 }}>
                  <div className={styles.contactLabel}>Email Address</div>
                  <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`} target="_blank" rel="noopener noreferrer" className={styles.contactValueLink}>
                    {personalInfo.email}
                  </a>
                </div>
                <button 
                  onClick={handleCopyEmail} 
                  className={styles.copyBtn} 
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                </button>
              </div>
              
              {/* Phone */}
              <a href={`tel:${personalInfo.phone.replace(/\s/g, '')}`} className={styles.contactCard}>
                <div className={styles.contactIcon}><Phone size={20} color="white" /></div>
                <div>
                  <div className={styles.contactLabel}>Phone / WhatsApp</div>
                  <div className={styles.contactValue}>{personalInfo.phone}</div>
                </div>
              </a>
              
              {/* Location */}
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}><MapPin size={20} color="white" /></div>
                <div>
                  <div className={styles.contactLabel}>Location</div>
                  <div className={styles.contactValue}>{personalInfo.location}</div>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className={styles.socialRow}>
              {linkedinLink && (
                <a href={linkedinLink.url} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="LinkedIn">
                  <LinkedinIcon size={20} />
                  <span>LinkedIn</span>
                </a>
              )}
              {githubLink && (
                <a href={githubLink.url} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="GitHub">
                  <GithubIcon size={20} />
                  <span>GitHub</span>
                </a>
              )}
              <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Gmail">
                <ExternalLink size={18} />
                <span>Open in Gmail</span>
              </a>
            </div>
            
            {/* Availability & Status Card */}
            <div className={styles.availabilityCard}>
              <div className={styles.statusHeader}>
                <span className={styles.pulseDot} />
                <span className={styles.statusText}>Open to Opportunities</span>
              </div>
              <p className={styles.availabilityDesc}>
                Available immediately for Full-Stack / Frontend Developer internships and entry-level engineering roles.
              </p>
              <div className={styles.statusMeta}>
                <div className={styles.metaItem}>
                  <Clock size={14} />
                  <span>Timezone: IST (UTC +5:30)</span>
                </div>
                <div className={styles.metaItem}>
                  <Sparkles size={14} />
                  <span>Response: &lt; 24 Hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
