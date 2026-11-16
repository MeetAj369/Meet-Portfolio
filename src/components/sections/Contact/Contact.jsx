import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Copy, Check, ExternalLink, Clock, Sparkles, ArrowUpRight, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsappIcon } from '../../common/Icons/BrandIcons';
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
  const [lastEmailDetails, setLastEmailDetails] = useState(null);

  const linkedinLink = socialLinks.find(s => s.name === 'LinkedIn') || { url: 'https://www.linkedin.com/in/meetaj0369/' };
  const githubLink = socialLinks.find(s => s.name === 'GitHub') || { url: 'https://github.com/MeetAj369' };
  const whatsappUrl = `https://wa.me/919106477426?text=${encodeURIComponent('Hi Meet, I came across your portfolio and would love to connect!')}`;

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
    if (!formData.name.trim()) newErrors.name = 'Please enter your name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Please enter a subject';
    if (!formData.message.trim()) {
      newErrors.message = 'Please write a brief message';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Message must be at least 5 characters long';
    }
    return newErrors;
  };

  const handleSendEmail = (mode) => {
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const subjectStr = formData.subject.trim() || 'Portfolio Inquiry';
    const bodyStr = `Hi Meet,\n\n${formData.message.trim()}\n\n---\nSent by: ${formData.name.trim()}\nReply-to: ${formData.email.trim()}`;

    const subject = encodeURIComponent(subjectStr);
    const body = encodeURIComponent(bodyStr);

    setLastEmailDetails({ subject, body });

    try {
      navigator.clipboard.writeText(bodyStr);
    } catch (_) {}

    if (mode === 'gmail') {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}&su=${subject}&body=${body}`;
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    } else {
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
      window.location.href = mailtoUrl;
    }

    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className={styles.contactSection} ref={revealRef}>
      <div className="container">
        {/* Action-Oriented Title & Subtitle */}
        <SectionTitle 
          title="Let's build something." 
          subtitle="I'm currently open to Job, freelance opportunities, collaborations and interesting development projects." 
        />

        {/* Floating Toast Notification */}
        {copied && (
          <div className={styles.toast}>
            <Check size={16} />
            <span>Copied {personalInfo.email} to clipboard!</span>
          </div>
        )}

        {/* Primary Action Channels Trio */}
        <div className={styles.primaryChannelsGrid}>
          {/* Channel 1: Email Me */}
          <div className={styles.primaryChannelCard}>
            <div className={styles.channelIconWrap}>
              <Mail size={22} color="white" />
            </div>
            <div className={styles.channelMeta}>
              <span className={styles.channelTag}>PRIMARY CHANNEL</span>
              <h3 className={styles.channelTitle}>Email Me</h3>
              <p className={styles.channelDesc}>Direct inquiries, job offers & project proposals</p>
              <a 
                href={`mailto:${personalInfo.email}`}
                className={styles.channelActionLink}
                title="Send email to Meet"
              >
                {personalInfo.email}
              </a>
            </div>
            <div className={styles.channelBtnRow}>
              <a 
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.channelBtnPrimary}
              >
                <ExternalLink size={14} /> Open Gmail
              </a>
              <button 
                type="button" 
                onClick={handleCopyEmail} 
                className={styles.channelBtnSecondary}
                title="Copy email address"
              >
                {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />} Copy
              </button>
            </div>
          </div>

          {/* Channel 2: LinkedIn */}
          <a 
            href={linkedinLink.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${styles.primaryChannelCard} ${styles.interactiveCard}`}
          >
            <div className={styles.channelIconWrap}>
              <LinkedinIcon size={22} color="white" />
            </div>
            <div className={styles.channelMeta}>
              <span className={styles.channelTag}>PROFESSIONAL NETWORK</span>
              <h3 className={styles.channelTitle}>
                LinkedIn <ArrowUpRight size={18} className={styles.arrowIcon} />
              </h3>
              <p className={styles.channelDesc}>Connect, review background & message directly</p>
              <span className={styles.channelHandle}>linkedin.com/in/meetaj0369</span>
            </div>
            <div className={styles.channelBtnRow}>
              <span className={styles.channelBtnPrimary}>
                <LinkedinIcon size={14} /> Connect on LinkedIn
              </span>
            </div>
          </a>

          {/* Channel 3: GitHub */}
          <a 
            href={githubLink.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${styles.primaryChannelCard} ${styles.interactiveCard}`}
          >
            <div className={styles.channelIconWrap}>
              <GithubIcon size={22} color="white" />
            </div>
            <div className={styles.channelMeta}>
              <span className={styles.channelTag}>CODE & CONTRIBUTIONS</span>
              <h3 className={styles.channelTitle}>
                GitHub <ArrowUpRight size={18} className={styles.arrowIcon} />
              </h3>
              <p className={styles.channelDesc}>Explore repositories, hackathons & code commits</p>
              <span className={styles.channelHandle}>github.com/MeetAj369</span>
            </div>
            <div className={styles.channelBtnRow}>
              <span className={styles.channelBtnPrimary}>
                <GithubIcon size={14} /> Explore GitHub
              </span>
            </div>
          </a>
        </div>
        
        {/* Contact Form & Secondary Details Grid */}
        <div className={styles.contactContainer}>
          {/* Form Column */}
          <div className={`${styles.formColumn} reveal`}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>Send a Direct Message</h3>
              <p className={styles.formSubtitle}>Fills a formatted draft ready to send via Gmail or your mail app</p>
            </div>

            {submitted ? (
              <div className={styles.successMessage}>
                <div className={styles.successIconWrap}>
                  <Send size={36} className={styles.successIcon} />
                </div>
                <h3>Message Draft Generated!</h3>
                <p>
                  Your message has been formatted for <strong>{personalInfo.email}</strong>. 
                  Choose an option below to open and dispatch anytime:
                </p>

                <div className={styles.successActions}>
                  {lastEmailDetails && (
                    <>
                      <a 
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}&su=${lastEmailDetails.subject}&body=${lastEmailDetails.body}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.submitBtn}
                      >
                        <ExternalLink size={16} /> Open in Gmail Web
                      </a>
                      <a 
                        href={`mailto:${personalInfo.email}?subject=${lastEmailDetails.subject}&body=${lastEmailDetails.body}`}
                        className={styles.secondarySubmitBtn}
                      >
                        <Mail size={16} /> Open in Mail App
                      </a>
                    </>
                  )}
                  <button 
                    onClick={() => setSubmitted(false)} 
                    className={styles.resetFormBtn}
                  >
                    Write Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleSendEmail('gmail'); }} noValidate>
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
                    placeholder="Job Opportunity / Project Collaboration" 
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
                    placeholder="Hi Meet, I came across your portfolio and would like to discuss..." 
                    aria-invalid={!!errors.message} 
                  />
                  {errors.message && <span className={styles.formError}>{errors.message}</span>}
                </div>
                
                <div className={styles.formBtnGroup}>
                  <button 
                    type="button" 
                    onClick={() => handleSendEmail('gmail')} 
                    className={styles.submitBtn}
                    title="Open pre-filled draft directly in Gmail Web"
                  >
                    <ExternalLink size={18} />
                    <span>Send via Gmail Web</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleSendEmail('mailto')} 
                    className={styles.secondarySubmitBtn}
                    title="Open in your default mail app (Outlook, Apple Mail, etc.)"
                  >
                    <Mail size={18} />
                    <span>Send via Default Mail App</span>
                  </button>
                </div>
              </form>
            )}
          </div>
          
          {/* Info Column */}
          <div className={`${styles.infoColumn} reveal`}>
            {/* Availability & Status Card */}
            <div className={styles.availabilityCard}>
              <div className={styles.statusHeader}>
                <span className={styles.pulseDot} />
                <span className={styles.statusText}>Currently Open to Opportunities</span>
              </div>
              <p className={styles.availabilityDesc}>
                Available immediately for Full-Stack / Frontend Developer job roles, technical internships, and select freelance engineering collaborations.
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
                <div className={styles.metaItem}>
                  <MapPin size={14} />
                  <span>Location: {personalInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Secondary WhatsApp Channel (Discreet & Subordinate) */}
            <div className={styles.secondaryChannelBox}>
              <div className={styles.secondaryHeader}>
                <span className={styles.secondaryBadge}>SECONDARY CHANNEL</span>
                <span className={styles.secondaryLabel}>Quick messaging & casual inquiries</span>
              </div>
              <p className={styles.secondaryDesc}>
                For formal opportunities, please use Email or LinkedIn above. For quick questions or casual chats:
              </p>
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.whatsappBtn}
                title="Message Meet on WhatsApp"
              >
                <WhatsappIcon size={18} className={styles.whatsappIcon} />
                <span>Message on WhatsApp</span>
                <span className={styles.whatsappNumber}>(+91 91064 77426)</span>
              </a>
            </div>

            {/* Location & Timezone Summary */}
            <div className={styles.locationCard}>
              <div className={styles.locIcon}><MapPin size={20} color="white" /></div>
              <div className={styles.locText}>
                <div className={styles.locTitle}>Based in Anand, Gujarat, India</div>
                <div className={styles.locSubtitle}>Open to remote worldwide & on-site software engineering roles</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
