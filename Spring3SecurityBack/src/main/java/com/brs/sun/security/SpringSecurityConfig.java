package com.brs.sun.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.brs.sun.jpa.SecMemService;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SpringSecurityConfig {
	
	@Autowired
	private UserDetailServiceImpl userDetailsService;
	
	//@Bean
	public PasswordEncoder loginPasswordEncoder() {
		return new NoPasswordEncoder();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		http
			.cors(cors -> cors
					.configurationSource(corsConfigurationSource())
			)
			.csrf(csrf -> csrf.disable())
			.authorizeHttpRequests(authorize -> authorize
					.requestMatchers("/loginProcess", "/register").permitAll()
					.requestMatchers("/admin/**").hasRole("ADMIN")
					.requestMatchers("/user/**").authenticated()
					.anyRequest().permitAll()
					)
			.formLogin(formLogin -> formLogin
					.loginPage("/securelogin")
					.loginProcessingUrl("/loginProcess")
					.usernameParameter("id")
					.passwordParameter("password")
					.defaultSuccessUrl("/loginOk", true)
					)
			.logout(logout -> logout
					.logoutUrl("/logout")
					.logoutSuccessUrl("/logoutOk")
					.invalidateHttpSession(true)
					.deleteCookies("JSESSIONID")
					)
			.rememberMe(rememberMe -> rememberMe
					.key("rememberMe")
					.tokenValiditySeconds(3600)
					.userDetailsService(userDetailsService)
					.rememberMeParameter("rememberMe")
					.rememberMeCookieName("rememberMe-cookie")
					)
			.sessionManagement(session -> session
					.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
					.maximumSessions(1)
					.maxSessionsPreventsLogin(false)
					.sessionRegistry(sessionRegistry())
					);
		http.addFilterBefore(corsFilter(), UsernamePasswordAuthenticationFilter.class);
		return http.build();
			
	}
	
	@Bean
	public CorsFilter corsFilter() {
		return new CorsFilter(corsConfigurationSource());
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
		config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		config.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
		config.setAllowCredentials(true);
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		
		return source;
	}
	
	@Bean
	public SessionRegistry sessionRegistry() {
		return new SessionRegistryImpl();
	}
	
	@Bean
    public HttpSessionEventPublisher httpSessionEventPublisher() {
        return new HttpSessionEventPublisher();
    }
	

}
