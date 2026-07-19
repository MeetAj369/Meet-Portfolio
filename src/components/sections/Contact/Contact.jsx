import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
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

  const linkedinLink = socialLinks.find(s => s.name === 'LinkedIn');
  const githubLink = socialLinks.find(s => s.name === 'GitHub');

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
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <section id="contact" className={styles.contactSection} ref={revealRef}>
      <div className="container">
        <SectionTitle title="Get In Touch" subtitle="Let's work together" />
        
        <div className={styles.contactContainer}>
          {/* Form Column */}
          <div className={`${styles.formColumn} reveal`}>
            {submitted ? (
              <div className={styles.successMessage}>
                <Send size={48} className={styles.successIcon} />
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`${styles.formInput} ${errors.name ? styles.inputError : ''}`} placeholder="John Doe" aria-invalid={!!errors.name} />
                  {errors.name && <span className={styles.formError}>{errors.name}</span>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`${styles.formInput} ${errors.email ? styles.inputError : ''}`} placeholder="john@example.com" aria-invalid={!!errors.email} />
                  {errors.email && <span className={styles.formError}>{errors.email}</span>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.formLabel}>Subject</label>
                  <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className={`${styles.formInput} ${errors.subject ? styles.inputError : ''}`} placeholder="Project Inquiry" aria-invalid={!!errors.subject} />
                  {errors.subject && <span className={styles.formError}>{errors.subject}</span>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} className={`${styles.formTextarea} ${errors.message ? styles.inputError : ''}`} placeholder="Hello, I'd like to talk about..." aria-invalid={!!errors.message} />
                  {errors.message && <span className={styles.formError}>{errors.message}</span>}
                </div>
                
                <button type="submit" className={styles.submitBtn}>
                  <Send size={18} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
          
          {/* Info Column */}
          <div className={`${styles.infoColumn} reveal`}>
            <div className={styles.contactInfo}>
              <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`} target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
                <div className={styles.contactIcon}><Mail size={20} color="white" /></div>
                <div>
                  <div className={styles.contactLabel}>Email</div>
                  <div className={styles.contactValue}>{personalInfo.email}</div>
                </div>
              </a>
              
              <a href={`tel:${personalInfo.phone.replace(/\s/g, '')}`} className={styles.contactCard}>
                <div className={styles.contactIcon}><Phone size={20} color="white" /></div>
                <div>
                  <div className={styles.contactLabel}>Phone</div>
                  <div className={styles.contactValue}>{personalInfo.phone}</div>
                </div>
              </a>
              
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}><MapPin size={20} color="white" /></div>
                <div>
                  <div className={styles.contactLabel}>Location</div>
                  <div className={styles.contactValue}>{personalInfo.location}</div>
                </div>
              </div>
            </div>
            
            <div className={styles.socialRow}>
              {linkedinLink && (
                <a href={linkedinLink.url} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="LinkedIn">
                  <LinkedinIcon size={20} />
                </a>
              )}
              {githubLink && (
                <a href={githubLink.url} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="GitHub">
                  <GithubIcon size={20} />
                </a>
              )}
            </div>
            
            <div className={styles.mapPlaceholder}>
              <MapPin size={32} className={styles.mapIcon} />
              <span>{personalInfo.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
